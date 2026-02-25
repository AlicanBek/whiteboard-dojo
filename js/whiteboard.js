// Whiteboard Application
// Fabric.js-based drawing and shape creation tool

// ========================================
// State Variables
// ========================================

let canvas;
let currentTool = 'select';
let currentShape = null;
let currentColor = '#E32727';
let currentStrokeWidth = 2;
let isFillMode = false;
let isDrawingShape = false;
let shapeStartPoint = null;
let tempShape = null;

// Undo/Redo state
let history = [];
let historyStep = 0;
let isUndoRedoAction = false;

// ========================================
// Configuration
// ========================================

const CONFIG = {
    MIN_STROKE_WIDTH: 1,
    MAX_STROKE_WIDTH: 20,
    DEFAULT_COLOR: '#E32727',
    CANVAS_BACKGROUND: '#ffffff',
    EXPORT_BACKGROUND: '#ffffff',
    DEFAULT_FONT_SIZE: 24,
    FONT_FAMILY: 'Space Grotesk',
    STAR_POINTS: 5
};

// ========================================
// Initialization
// ========================================

function initializeCanvas() {
    const canvasElement = document.getElementById('whiteboard-canvas');

    // Calculate canvas dimensions
    const toolbarHeight = document.querySelector('.whiteboard-toolbar').offsetHeight;
    const canvasWidth = Math.min(window.innerWidth - 100, 1400);
    const canvasHeight = window.innerHeight - toolbarHeight - 150;

    // Initialize Fabric.js canvas
    canvas = new fabric.Canvas('whiteboard-canvas', {
        backgroundColor: CONFIG.CANVAS_BACKGROUND,
        width: canvasWidth,
        height: canvasHeight,
        isDrawingMode: false,
        selection: true
    });

    // Configure drawing brush
    canvas.freeDrawingBrush.color = currentColor;
    canvas.freeDrawingBrush.width = currentStrokeWidth;

    // Set up canvas event listeners
    canvas.on('mouse:down', handleCanvasMouseDown);
    canvas.on('mouse:move', handleCanvasMouseMove);
    canvas.on('mouse:up', handleCanvasMouseUp);

    // History tracking events
    canvas.on('object:added', () => saveHistory());
    canvas.on('object:modified', () => saveHistory());
    canvas.on('object:removed', () => saveHistory());
    canvas.on('path:created', () => saveHistory());

    // Save initial empty state
    saveHistory();

    console.log('Canvas initialized:', canvasWidth, 'x', canvasHeight);
}

function setupEventListeners() {
    // Tool buttons
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tool = e.currentTarget.dataset.tool;
            selectTool(tool);
        });
    });

    // Shape buttons
    const shapeButtons = document.querySelectorAll('.shape-btn');
    shapeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const shape = e.currentTarget.dataset.shape;
            selectShape(shape);
        });
    });

    // Color picker
    const colorPicker = document.getElementById('color-picker');
    colorPicker.addEventListener('change', (e) => {
        currentColor = e.target.value;
        updateColorPresets();
        updateDrawingBrush();
    });

    // Color presets
    const colorPresets = document.querySelectorAll('.color-preset');
    colorPresets.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const color = e.currentTarget.dataset.color;
            currentColor = color;
            colorPicker.value = color;
            updateColorPresets();
            updateDrawingBrush();
        });
    });

    // Stroke width slider
    const strokeSlider = document.getElementById('stroke-width');
    const strokeValue = document.getElementById('stroke-value');
    strokeSlider.addEventListener('input', (e) => {
        currentStrokeWidth = parseInt(e.target.value);
        strokeValue.textContent = `${currentStrokeWidth}px`;
        updateDrawingBrush();
    });

    // Fill toggle button
    const fillToggleBtn = document.getElementById('fill-toggle-btn');
    fillToggleBtn.addEventListener('click', () => {
        isFillMode = !isFillMode;
        fillToggleBtn.classList.toggle('active', isFillMode);
        fillToggleBtn.setAttribute('data-fill', isFillMode ? 'fill' : 'stroke');
    });

    // Action buttons
    document.getElementById('undo-btn').addEventListener('click', undo);
    document.getElementById('redo-btn').addEventListener('click', redo);
    document.getElementById('delete-btn').addEventListener('click', deleteSelected);
    document.getElementById('clear-btn').addEventListener('click', clearCanvas);
    document.getElementById('export-btn').addEventListener('click', exportCanvas);

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyDown);

    // Window resize
    window.addEventListener('resize', resizeCanvas);
}

// ========================================
// Tool Management
// ========================================

function selectTool(tool) {
    currentTool = tool;
    currentShape = null;

    // Update canvas mode
    if (tool === 'draw') {
        canvas.isDrawingMode = true;
        canvas.selection = false;
    } else if (tool === 'select') {
        canvas.isDrawingMode = false;
        canvas.selection = true;
    } else if (tool === 'text') {
        canvas.isDrawingMode = false;
        canvas.selection = false;
    }

    // Update button states
    updateToolButtons();
    updateShapeButtons();
}

function selectShape(shape) {
    currentShape = shape;
    currentTool = 'shape';
    canvas.isDrawingMode = false;
    canvas.selection = false;

    updateToolButtons();
    updateShapeButtons();
}

function updateToolButtons() {
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(btn => {
        if (btn.dataset.tool === currentTool && currentTool !== 'shape') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updateShapeButtons() {
    const shapeButtons = document.querySelectorAll('.shape-btn');
    shapeButtons.forEach(btn => {
        if (btn.dataset.shape === currentShape && currentTool === 'shape') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updateDrawingBrush() {
    if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = currentColor;
        canvas.freeDrawingBrush.width = currentStrokeWidth;
    }
}

function updateColorPresets() {
    const colorPresets = document.querySelectorAll('.color-preset');
    colorPresets.forEach(btn => {
        const btnColor = btn.dataset.color.toUpperCase();
        const currentColorUpper = currentColor.toUpperCase();
        if (btnColor === currentColorUpper) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ========================================
// Undo/Redo Functions
// ========================================

function saveHistory() {
    if (isUndoRedoAction) return;

    const json = JSON.stringify(canvas.toJSON());

    // Remove any states after current step (when user makes new action after undo)
    history = history.slice(0, historyStep + 1);

    // Add new state
    history.push(json);
    historyStep = history.length - 1;

    // Limit history to 50 states to prevent memory issues
    if (history.length > 50) {
        history.shift();
        historyStep--;
    }

    updateUndoRedoButtons();
}

function undo() {
    if (historyStep > 0) {
        isUndoRedoAction = true;
        historyStep--;

        const state = history[historyStep];
        canvas.loadFromJSON(state, () => {
            canvas.renderAll();
            isUndoRedoAction = false;
            updateUndoRedoButtons();
        });
    }
}

function redo() {
    if (historyStep < history.length - 1) {
        isUndoRedoAction = true;
        historyStep++;

        const state = history[historyStep];
        canvas.loadFromJSON(state, () => {
            canvas.renderAll();
            isUndoRedoAction = false;
            updateUndoRedoButtons();
        });
    }
}

function updateUndoRedoButtons() {
    const undoBtn = document.getElementById('undo-btn');
    const redoBtn = document.getElementById('redo-btn');

    undoBtn.disabled = historyStep <= 0;
    redoBtn.disabled = historyStep >= history.length - 1;
}

// ========================================
// Canvas Event Handlers
// ========================================

function handleCanvasMouseDown(options) {
    const evt = options.e;
    const pointer = canvas.getPointer(evt);

    if (currentTool === 'text') {
        addText(pointer);
    } else if (currentTool === 'shape' && currentShape) {
        startShapeDrawing(pointer);
    }
}

function handleCanvasMouseMove(options) {
    if (currentTool === 'shape' && isDrawingShape) {
        const evt = options.e;
        const pointer = canvas.getPointer(evt);
        continueShapeDrawing(pointer);
    }
}

function handleCanvasMouseUp(options) {
    if (currentTool === 'shape' && isDrawingShape) {
        finishShapeDrawing();
    }
}

// ========================================
// Text Tool
// ========================================

function addText(pointer) {
    const text = new fabric.IText('Double-click to edit', {
        left: pointer.x,
        top: pointer.y,
        fill: currentColor,
        fontSize: CONFIG.DEFAULT_FONT_SIZE,
        fontFamily: CONFIG.FONT_FAMILY
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    text.enterEditing();
    text.selectAll();
}

// ========================================
// Shape Creation
// ========================================

function startShapeDrawing(pointer) {
    isDrawingShape = true;
    shapeStartPoint = { x: pointer.x, y: pointer.y };
}

function continueShapeDrawing(pointer) {
    if (!isDrawingShape || !currentShape) return;

    // Remove previous temp shape
    if (tempShape) {
        canvas.remove(tempShape);
        tempShape = null;
    }

    // Create preview shape
    tempShape = createShape(currentShape, shapeStartPoint, pointer);
    if (tempShape) {
        canvas.add(tempShape);
        canvas.renderAll();
    }
}

function finishShapeDrawing() {
    isDrawingShape = false;
    shapeStartPoint = null;
    tempShape = null;
}

function createShape(shapeType, start, end) {
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);
    const left = Math.min(start.x, end.x);
    const top = Math.min(start.y, end.y);

    const commonProps = {
        left,
        top,
        fill: isFillMode ? currentColor : 'transparent',
        stroke: currentColor,
        strokeWidth: isFillMode ? 0 : currentStrokeWidth
    };

    switch(shapeType) {
        case 'rectangle':
            return new fabric.Rect({
                ...commonProps,
                width,
                height
            });

        case 'circle':
            const radius = Math.min(width, height) / 2;
            return new fabric.Circle({
                ...commonProps,
                radius,
                left: left + radius,
                top: top + radius,
                originX: 'center',
                originY: 'center'
            });

        case 'triangle':
            return new fabric.Triangle({
                ...commonProps,
                width,
                height
            });

        case 'line':
            return new fabric.Line([start.x, start.y, end.x, end.y], {
                stroke: currentColor,
                strokeWidth: currentStrokeWidth
            });

        case 'arrow':
            return createArrow(start.x, start.y, end.x, end.y);

        case 'star':
            const centerX = (start.x + end.x) / 2;
            const centerY = (start.y + end.y) / 2;
            const starRadius = Math.min(width, height) / 2;
            return createStar(centerX, centerY, starRadius);

        default:
            return null;
    }
}

function createArrow(x1, y1, x2, y2) {
    // Calculate angle
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const headLength = 15;

    // Create line
    const line = new fabric.Line([x1, y1, x2, y2], {
        stroke: currentColor,
        strokeWidth: currentStrokeWidth
    });

    // Create arrow head (triangle)
    const headAngle = fabric.util.radiansToDegrees(angle);
    const triangle = new fabric.Triangle({
        left: x2,
        top: y2,
        angle: headAngle + 90,
        width: 10,
        height: 15,
        fill: currentColor,
        originX: 'center',
        originY: 'center'
    });

    // Group line and triangle
    const arrow = new fabric.Group([line, triangle]);
    return arrow;
}

function createStar(cx, cy, radius) {
    const points = [];
    const spikes = CONFIG.STAR_POINTS;
    const step = Math.PI / spikes;
    const innerRadius = radius / 2;

    for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? radius : innerRadius;
        const angle = i * step - Math.PI / 2;
        points.push({
            x: cx + r * Math.cos(angle),
            y: cy + r * Math.sin(angle)
        });
    }

    return new fabric.Polygon(points, {
        fill: isFillMode ? currentColor : 'transparent',
        stroke: currentColor,
        strokeWidth: isFillMode ? 0 : currentStrokeWidth
    });
}

// ========================================
// Actions
// ========================================

function deleteSelected() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.remove(activeObject);
        canvas.discardActiveObject();
        canvas.requestRenderAll();
    }
}

function clearCanvas() {
    if (confirm('Are you sure you want to clear the entire canvas? This cannot be undone.')) {
        canvas.clear();
        canvas.backgroundColor = CONFIG.CANVAS_BACKGROUND;
        canvas.renderAll();
        saveHistory();
    }
}

function exportCanvas() {
    // Generate PNG data URL with high resolution
    const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1.0,
        multiplier: 2
    });

    // Create download link and trigger
    const link = document.createElement('a');
    const timestamp = new Date().getTime();
    link.download = `whiteboard-${timestamp}.png`;
    link.href = dataURL;
    link.click();
}

// ========================================
// Utility Functions
// ========================================

function resizeCanvas() {
    const toolbarHeight = document.querySelector('.whiteboard-toolbar').offsetHeight;
    const canvasWidth = Math.min(window.innerWidth - 100, 1400);
    const canvasHeight = window.innerHeight - toolbarHeight - 150;

    canvas.setDimensions({
        width: canvasWidth,
        height: canvasHeight
    });
    canvas.renderAll();
}

function handleKeyDown(e) {
    const activeObject = canvas.getActiveObject();

    // Delete key
    if (e.key === 'Delete' || e.key === 'Backspace') {
        if (activeObject && !activeObject.isEditing) {
            e.preventDefault();
            deleteSelected();
        }
    }

    // Ctrl/Cmd + Z for undo
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
    }

    // Ctrl/Cmd + Y or Ctrl/Cmd + Shift + Z for redo
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
    }

    // Ctrl/Cmd + S for export
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        exportCanvas();
    }
}

// ========================================
// Initialization on Page Load
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeCanvas();
    setupEventListeners();
    console.log('Whiteboard ready!');
});
