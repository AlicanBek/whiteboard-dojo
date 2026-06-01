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

// Clipboard for copy/paste
let clipboard = null;

// The fixed-size drawing page (artboard) and pan/zoom state
let page = null;
let isPanning = false;
let isSpaceDown = false;
let lastPanPoint = null;

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
    STAR_POINTS: 5,
    // Fixed page (artboard) dimensions
    PAGE_WIDTH: 1600,
    PAGE_HEIGHT: 1000,
    BACKDROP_COLOR: '#141414',
    GRID_SIZE: 22,
    // Zoom / pan
    MIN_ZOOM: 0.1,
    MAX_ZOOM: 5,
    ZOOM_STEP: 1.2,
    PAN_STEP: 140
};

// ========================================
// Initialization
// ========================================

function initializeCanvas() {
    const canvasElement = document.getElementById('whiteboard-canvas');

    // Full-bleed canvas: fill the entire viewport (floating panels overlay on top)
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    // Initialize Fabric.js canvas
    canvas = new fabric.Canvas('whiteboard-canvas', {
        width: canvasWidth,
        height: canvasHeight,
        isDrawingMode: false,
        selection: true,
        backgroundColor: CONFIG.BACKDROP_COLOR
    });

    // Build the fixed-size page and place it under all content
    createPage();

    // Configure drawing brush
    canvas.freeDrawingBrush.color = currentColor;
    canvas.freeDrawingBrush.width = currentStrokeWidth;

    // Set up canvas event listeners
    canvas.on('mouse:down', handleCanvasMouseDown);
    canvas.on('mouse:move', handleCanvasMouseMove);
    canvas.on('mouse:up', handleCanvasMouseUp);
    canvas.on('mouse:wheel', handleCanvasWheel);

    // History tracking events
    canvas.on('object:added', () => saveHistory());
    canvas.on('object:modified', () => saveHistory());
    canvas.on('object:removed', () => saveHistory());

    // Save initial empty state
    saveHistory();

    // On load, cover the viewport with the page so no backdrop shows
    coverScreen();

    console.log('Canvas initialized:', canvasWidth, 'x', canvasHeight);
}

// ========================================
// Page (artboard) + Zoom / Pan
// ========================================

// A repeating dot-grid pattern, drawn on the page so it pans/zooms with content
function buildGridPattern() {
    const tile = document.createElement('canvas');
    tile.width = CONFIG.GRID_SIZE;
    tile.height = CONFIG.GRID_SIZE;
    const ctx = tile.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, CONFIG.GRID_SIZE, CONFIG.GRID_SIZE);
    ctx.fillStyle = '#e0e0e0';
    ctx.beginPath();
    ctx.arc(1.5, 1.5, 1.5, 0, Math.PI * 2);
    ctx.fill();
    return new fabric.Pattern({ source: tile, repeat: 'repeat' });
}

function createPage() {
    page = new fabric.Rect({
        left: 0,
        top: 0,
        width: CONFIG.PAGE_WIDTH,
        height: CONFIG.PAGE_HEIGHT,
        fill: buildGridPattern(),
        stroke: '#d0d0d0',
        strokeWidth: 1,
        selectable: false,
        evented: false,
        excludeFromExport: true,
        hoverCursor: 'default',
        shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.5)', blur: 30, offsetX: 0, offsetY: 10 })
    });
    // Render the page beneath all drawn objects, transformed by the viewport
    canvas.setBackgroundImage(page, canvas.renderAll.bind(canvas));
}

function clampZoom(zoom) {
    return Math.min(Math.max(zoom, CONFIG.MIN_ZOOM), CONFIG.MAX_ZOOM);
}

function applyZoom(zoom, point) {
    zoom = clampZoom(zoom);
    const pt = point || new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2);
    canvas.zoomToPoint(pt, zoom);
    updateZoomDisplay();
}

function zoomIn() { applyZoom(canvas.getZoom() * CONFIG.ZOOM_STEP); }
function zoomOut() { applyZoom(canvas.getZoom() / CONFIG.ZOOM_STEP); }
function resetZoom() { applyZoom(1); }

function updateZoomDisplay() {
    const el = document.getElementById('zoom-level');
    if (el) el.textContent = `${Math.round(canvas.getZoom() * 100)}%`;
}

// Pan the viewport. Arrow direction = direction the view moves (content shifts opposite).
function panBy(dx, dy) {
    canvas.relativePan(new fabric.Point(dx, dy));
}

// Center the page at a given zoom (helper for fit / cover)
function centerPageAtZoom(zoom) {
    zoom = clampZoom(zoom);
    canvas.setZoom(zoom);
    const vpt = canvas.viewportTransform;
    vpt[4] = (canvas.getWidth() - CONFIG.PAGE_WIDTH * zoom) / 2;
    vpt[5] = (canvas.getHeight() - CONFIG.PAGE_HEIGHT * zoom) / 2;
    canvas.setViewportTransform(vpt);
    updateZoomDisplay();
}

// Fit the whole page within the viewport (page fully visible, may show backdrop)
function fitToScreen() {
    const padding = 100;
    centerPageAtZoom(Math.min(
        (canvas.getWidth() - padding) / CONFIG.PAGE_WIDTH,
        (canvas.getHeight() - padding) / CONFIG.PAGE_HEIGHT
    ));
}

// Cover the viewport with the page (no backdrop visible; page may extend off-screen)
function coverScreen() {
    centerPageAtZoom(Math.max(
        canvas.getWidth() / CONFIG.PAGE_WIDTH,
        canvas.getHeight() / CONFIG.PAGE_HEIGHT
    ));
}

// Ctrl/Cmd + wheel zooms to cursor; plain wheel pans
function handleCanvasWheel(opt) {
    const e = opt.e;
    if (e.ctrlKey || e.metaKey) {
        const zoom = canvas.getZoom() * Math.pow(0.999, e.deltaY);
        applyZoom(zoom, new fabric.Point(e.offsetX, e.offsetY));
    } else {
        canvas.relativePan(new fabric.Point(-e.deltaX, -e.deltaY));
    }
    e.preventDefault();
    e.stopPropagation();
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

    // Canvas navigation: zoom
    document.getElementById('zoom-in').addEventListener('click', zoomIn);
    document.getElementById('zoom-out').addEventListener('click', zoomOut);
    document.getElementById('zoom-level').addEventListener('click', resetZoom);
    document.getElementById('fit-btn').addEventListener('click', fitToScreen);

    // Canvas navigation: pan (arrow = direction the view moves)
    document.getElementById('pan-up').addEventListener('click', () => panBy(0, CONFIG.PAN_STEP));
    document.getElementById('pan-down').addEventListener('click', () => panBy(0, -CONFIG.PAN_STEP));
    document.getElementById('pan-left').addEventListener('click', () => panBy(CONFIG.PAN_STEP, 0));
    document.getElementById('pan-right').addEventListener('click', () => panBy(-CONFIG.PAN_STEP, 0));

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

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
        setObjectsSelectable(false);
    } else if (tool === 'select') {
        canvas.isDrawingMode = false;
        canvas.selection = true;
        setObjectsSelectable(true);
    } else if (tool === 'text') {
        canvas.isDrawingMode = false;
        canvas.selection = false;
        setObjectsSelectable(false);
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
    setObjectsSelectable(false);

    updateToolButtons();
    updateShapeButtons();
}

function setObjectsSelectable(selectable) {
    canvas.forEachObject(function(obj) {
        obj.selectable = selectable;
        obj.evented = selectable;
    });
    canvas.renderAll();
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

    // Don't save history while actively drawing shapes (during preview)
    if (isDrawingShape) return;

    // Snapshot drawn objects only — the page lives in backgroundImage and is never undone
    const json = JSON.stringify(canvas.getObjects().map(obj => obj.toObject()));

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

function loadHistoryState(step) {
    isUndoRedoAction = true;
    const objects = JSON.parse(history[step]);

    fabric.util.enlivenObjects(objects, (enlivened) => {
        canvas.remove(...canvas.getObjects());
        enlivened.forEach(obj => canvas.add(obj));
        canvas.renderAll();
        isUndoRedoAction = false;
        updateUndoRedoButtons();

        // Ensure objects match current tool's selection state
        if (currentTool !== 'select') {
            setObjectsSelectable(false);
        }
    });
}

function undo() {
    if (historyStep > 0) {
        historyStep--;
        loadHistoryState(historyStep);
    }
}

function redo() {
    if (historyStep < history.length - 1) {
        historyStep++;
        loadHistoryState(historyStep);
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

    // Space-drag (or middle mouse) pans the viewport
    if (isSpaceDown || evt.button === 1) {
        isPanning = true;
        canvas.selection = false;
        canvas.setCursor('grabbing');
        lastPanPoint = { x: evt.clientX, y: evt.clientY };
        return;
    }

    const pointer = canvas.getPointer(evt);

    if (currentTool === 'text') {
        // Check if there's a text object currently being edited
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.isEditing) {
            // Exit editing mode, which will trigger the switch to select tool
            activeObject.exitEditing();
            canvas.discardActiveObject();
            selectTool('select');
        } else {
            // No text being edited, create new text
            addText(pointer);
        }
    } else if (currentTool === 'shape' && currentShape) {
        startShapeDrawing(pointer);
    }
}

function handleCanvasMouseMove(options) {
    if (isPanning) {
        const evt = options.e;
        canvas.relativePan(new fabric.Point(
            evt.clientX - lastPanPoint.x,
            evt.clientY - lastPanPoint.y
        ));
        lastPanPoint = { x: evt.clientX, y: evt.clientY };
        return;
    }

    if (currentTool === 'shape' && isDrawingShape) {
        const evt = options.e;
        const pointer = canvas.getPointer(evt);
        continueShapeDrawing(pointer);
    }
}

function handleCanvasMouseUp(options) {
    if (isPanning) {
        isPanning = false;
        canvas.selection = (currentTool === 'select');
        canvas.setCursor(isSpaceDown ? 'grab' : 'default');
        return;
    }

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
    canvas.bringToFront(text);
    canvas.setActiveObject(text);
    text.enterEditing();
    text.selectAll();

    // Switch to select tool after text editing is done
    text.on('editing:exited', () => {
        selectTool('select');
    });
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

    // Select the shape that was just created before switching tools
    if (tempShape) {
        // Bring the shape to the front (highest z-index)
        canvas.bringToFront(tempShape);
        canvas.setActiveObject(tempShape);
    }
    tempShape = null;

    // Save history now that shape drawing is complete
    // This ensures the undo button works after creating shapes
    saveHistory();

    // Switch to select tool after shape creation
    selectTool('select');
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
        strokeWidth: isFillMode ? 0 : currentStrokeWidth,
        strokeLineCap: 'round',
        strokeLineJoin: 'round'
    };

    switch(shapeType) {
        case 'rectangle': {
            // Smart modern radius: scales with the smaller side, clamped 4–18px
            const r = Math.max(4, Math.min(18, Math.min(width, height) * 0.08));
            return new fabric.Rect({
                ...commonProps,
                width,
                height,
                rx: r,
                ry: r
            });
        }

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
                strokeWidth: currentStrokeWidth,
                strokeLineCap: 'round'
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

    // Create line with rounded caps for a softer modern look
    const line = new fabric.Line([x1, y1, x2, y2], {
        stroke: currentColor,
        strokeWidth: currentStrokeWidth,
        strokeLineCap: 'round'
    });

    // Create arrow head (triangle) - scale with stroke width but less aggressively
    const headAngle = fabric.util.radiansToDegrees(angle);
    const headWidth = currentStrokeWidth * 3.5;
    const headHeight = currentStrokeWidth * 5;

    const triangle = new fabric.Triangle({
        left: x2,
        top: y2,
        angle: headAngle + 90,
        width: headWidth,
        height: headHeight,
        fill: currentColor,
        originX: 'center',
        originY: 'center',
        strokeLineJoin: 'round'
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
        strokeWidth: isFillMode ? 0 : currentStrokeWidth,
        strokeLineCap: 'round',
        strokeLineJoin: 'round'
    });
}

// ========================================
// Actions
// ========================================

function deleteSelected() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        // Handle multi-selection (ActiveSelection)
        if (activeObject.type === 'activeSelection') {
            activeObject.forEachObject(function(obj) {
                canvas.remove(obj);
            });
        } else {
            // Single object
            canvas.remove(activeObject);
        }
        canvas.discardActiveObject();
        canvas.requestRenderAll();
    }
}

function copySelected() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        activeObject.clone(function(cloned) {
            clipboard = cloned;
        });
    }
}

function pasteFromClipboard() {
    if (!clipboard) return;

    clipboard.clone(function(clonedObj) {
        canvas.discardActiveObject();

        // Offset the pasted object slightly so it doesn't overlap exactly
        clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            evented: true,
        });

        // Handle multi-selection (ActiveSelection)
        if (clonedObj.type === 'activeSelection') {
            // ActiveSelection needs special handling
            clonedObj.canvas = canvas;
            clonedObj.forEachObject(function(obj) {
                canvas.add(obj);
            });
            clonedObj.setCoords();
        } else {
            // Single object
            canvas.add(clonedObj);
        }

        // Bring to front and select the pasted object(s)
        canvas.bringToFront(clonedObj);
        canvas.setActiveObject(clonedObj);
        canvas.requestRenderAll();
    });
}

function clearCanvas() {
    if (confirm('Are you sure you want to clear the entire canvas? This cannot be undone.')) {
        // Remove drawn objects only; keep the page (backgroundImage)
        canvas.remove(...canvas.getObjects());
        canvas.discardActiveObject();
        canvas.requestRenderAll();
        saveHistory();
    }
}

function exportCanvas() {
    // Export the page region at full resolution, independent of current zoom/pan.
    // The page (backgroundImage) is excluded from export, so paint a clean white
    // backdrop and crop to the page bounds.
    const savedVpt = canvas.viewportTransform.slice();
    const savedBg = canvas.backgroundColor;

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    canvas.backgroundColor = CONFIG.EXPORT_BACKGROUND;
    canvas.renderAll();

    const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1.0,
        multiplier: 2,
        left: 0,
        top: 0,
        width: CONFIG.PAGE_WIDTH,
        height: CONFIG.PAGE_HEIGHT
    });

    // Restore the backdrop and the user's view
    canvas.backgroundColor = savedBg;
    canvas.setViewportTransform(savedVpt);
    canvas.renderAll();

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
    canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
    });
    canvas.renderAll();
}

function handleKeyDown(e) {
    const activeObject = canvas.getActiveObject();
    const editing = activeObject && activeObject.isEditing;

    // Hold Space to temporarily pan (grab cursor)
    if (e.code === 'Space' && !editing) {
        if (!isSpaceDown) {
            isSpaceDown = true;
            canvas.defaultCursor = 'grab';
            canvas.setCursor('grab');
        }
        e.preventDefault();
        return;
    }

    // Zoom shortcuts: Ctrl/Cmd + plus / minus / 0 (fit)
    if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        zoomIn();
        return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        zoomOut();
        return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault();
        fitToScreen();
        return;
    }

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

    // Tool shortcuts (only when not editing text)
    if (!activeObject || !activeObject.isEditing) {
        // V for select tool
        if (e.key === 'v' || e.key === 'V') {
            e.preventDefault();
            selectTool('select');
        }

        // B for draw/brush tool
        if (e.key === 'b' || e.key === 'B') {
            e.preventDefault();
            selectTool('draw');
        }

        // T for text tool
        if (e.key === 't' || e.key === 'T') {
            e.preventDefault();
            selectTool('text');
        }
    }

    // Ctrl/Cmd + C for copy
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        if (activeObject && !activeObject.isEditing) {
            e.preventDefault();
            copySelected();
        }
    }

    // Ctrl/Cmd + V for paste
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        if (!activeObject || !activeObject.isEditing) {
            e.preventDefault();
            pasteFromClipboard();
        }
    }

    // Ctrl/Cmd + S for export
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        exportCanvas();
    }
}

function handleKeyUp(e) {
    if (e.code === 'Space') {
        isSpaceDown = false;
        canvas.defaultCursor = 'default';
        if (!isPanning) canvas.setCursor('default');
    }
}

// ========================================
// Challenge Timer State
// ========================================

let challengeTimer = null;
let challengeTimeLeft = 0;
let initialChallengeTime = 0;
let isTimerRunning = false;
const DEFAULT_TIMER_SECONDS = 15 * 60; // 15 minutes

// ========================================
// Challenge and Timer Functions
// ========================================

function initializeChallengeSection() {
    // Check URL parameters for challenge data
    const urlParams = new URLSearchParams(window.location.search);
    const challengeParam = urlParams.get('challenge');

    if (!challengeParam) {
        return; // No challenge in URL, keep section hidden
    }

    // Parse challenge data
    const challengeData = new URLSearchParams(decodeURIComponent(challengeParam));
    const design = challengeData.get('design');
    const forValue = challengeData.get('for');
    const toHelp = challengeData.get('toHelp');
    const timerValue = challengeData.get('timer');

    if (!design || !forValue || !toHelp) {
        return; // Invalid challenge data
    }

    // Show challenge section
    const challengeSection = document.getElementById('whiteboard-challenge-section');
    challengeSection.style.display = 'flex';

    // Populate challenge details
    const challengeDetails = document.getElementById('challenge-details');
    challengeDetails.innerHTML = `
        <div class="challenge-field-inline">
            <span class="challenge-label-inline">Design:</span>
            <span class="challenge-value-inline">${design}</span>
        </div>
        <div class="challenge-field-inline">
            <span class="challenge-label-inline">For:</span>
            <span class="challenge-value-inline">${forValue}</span>
        </div>
        <div class="challenge-field-inline">
            <span class="challenge-label-inline">To help:</span>
            <span class="challenge-value-inline">${toHelp}</span>
        </div>
    `;

    // Initialize timer with value from URL or default
    challengeTimeLeft = timerValue ? parseInt(timerValue) : DEFAULT_TIMER_SECONDS;
    initialChallengeTime = challengeTimeLeft; // Store initial time for reset
    updateChallengeTimerDisplay();

    // Set up timer button event listeners
    document.getElementById('start-btn').addEventListener('click', startChallengeTimer);
    document.getElementById('pause-btn').addEventListener('click', pauseChallengeTimer);
    document.getElementById('reset-btn').addEventListener('click', resetChallengeTimer);
    document.getElementById('increase-timer-btn-wb').addEventListener('click', increaseChallengeTimer);
    document.getElementById('decrease-timer-btn-wb').addEventListener('click', decreaseChallengeTimer);

    // Minimize / close the challenge card
    const minimizeBtn = document.getElementById('challenge-minimize');
    minimizeBtn.addEventListener('click', () => {
        const minimized = challengeSection.classList.toggle('minimized');
        minimizeBtn.textContent = minimized ? '▢' : '–';
        minimizeBtn.title = minimized ? 'Expand' : 'Minimize';
    });
    document.getElementById('challenge-close').addEventListener('click', () => {
        pauseChallengeTimer();
        challengeSection.style.display = 'none';
    });

    // Update button states
    updateTimerButtonStates();
}

function formatChallengeTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateChallengeTimerDisplay() {
    const timerDisplay = document.getElementById('timer-display-large');
    timerDisplay.textContent = formatChallengeTime(challengeTimeLeft);
}

function startChallengeTimer() {
    if (isTimerRunning) return;

    isTimerRunning = true;
    document.getElementById('start-btn').disabled = true;
    document.getElementById('pause-btn').disabled = false;
    updateTimerButtonStates();

    challengeTimer = setInterval(() => {
        challengeTimeLeft--;
        updateChallengeTimerDisplay();

        if (challengeTimeLeft <= 0) {
            clearInterval(challengeTimer);
            isTimerRunning = false;
            document.getElementById('start-btn').disabled = false;
            document.getElementById('pause-btn').disabled = true;
            updateTimerButtonStates();
            alert("Time's up! Great work on your challenge!");
        }
    }, 1000);
}

function pauseChallengeTimer() {
    if (!isTimerRunning) return;

    clearInterval(challengeTimer);
    isTimerRunning = false;
    document.getElementById('start-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
    updateTimerButtonStates();
}

function resetChallengeTimer() {
    clearInterval(challengeTimer);
    isTimerRunning = false;
    challengeTimeLeft = initialChallengeTime;
    updateChallengeTimerDisplay();
    document.getElementById('start-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
    updateTimerButtonStates();
}

function increaseChallengeTimer() {
    if (!isTimerRunning && challengeTimeLeft > 0) {
        challengeTimeLeft = Math.min(challengeTimeLeft + 60, 120 * 60); // Add 1 minute, max 120 minutes
        updateChallengeTimerDisplay();
    }
}

function decreaseChallengeTimer() {
    if (!isTimerRunning && challengeTimeLeft > 0) {
        challengeTimeLeft = Math.max(challengeTimeLeft - 60, 60); // Remove 1 minute, min 1 minute
        updateChallengeTimerDisplay();
    }
}

function updateTimerButtonStates() {
    const increaseBtn = document.getElementById('increase-timer-btn-wb');
    const decreaseBtn = document.getElementById('decrease-timer-btn-wb');

    if (increaseBtn && decreaseBtn) {
        increaseBtn.disabled = isTimerRunning;
        decreaseBtn.disabled = isTimerRunning;
    }
}

// ========================================
// Initialization on Page Load
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeCanvas();
    setupEventListeners();
    initializeChallengeSection(); // Initialize challenge display if coming from dojo
    console.log('Whiteboard ready!');
});
