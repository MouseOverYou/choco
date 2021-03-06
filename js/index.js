
var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };

var BGDefault
var currentWorld = "turbine"

/******* Add the create scene function ******/
var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    var assetsManager = new BABYLON.AssetsManager(scene)
    LoadAssets(scene, assetsManager)
    camera = new BABYLON.ArcRotateCamera("Camera", 0 * (Math.PI / 180), 90 * (Math.PI / 180), 3, new BABYLON.Vector3(0, 0.75, 0), scene);
    camera.minZ = 1
    camera.panningDistanceLimit = 0;
    camera.pinchToPanMaxDistance = 0;
    camera.panningSensibility = 0
    camera.lowerRadiusLimit = 2.2
    camera.upperRadiusLimit = 6
    camera.upperBetaLimit = 90 * (Math.PI / 180)
    camera.angularSensibilityX = 3000
    camera.angularSensibilityy = 3000
    camera.wheelPrecision = 10
    camera.attachControl(canvas, true, true, false);

    scene.clearColor = new BABYLON.Color3(1, 1, 1);
    scene.ambientColor = new BABYLON.Color3(1, 1, 1);
    BGDefault = scene.createDefaultEnvironment({
        groundColor: new BABYLON.Color3(1, 1, 1),
        skyboxColor: new BABYLON.Color3(1, 1, 1)

    });
    BGDefault.skybox.setEnabled(false)
    BGDefault.rootMesh.position.y = -0.05

    

    //var vrHelper = scene.createDefaultVRExperience({createDeviceOrientationCamera:false});
    //Handle Dragging MOuse

    scene.onPointerMove = function () {
        //updates rotation of hotspots
        for (let hs of HsPLaneList) {
            A_LooksAt_B(hs, camera)
        }

    }

    var showUI = false
    scene.onPointerDown = function () {
        //alert("Hola")
        
        var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return (mesh.name.startsWith("HS Collider") && mesh.isPickable); });
        if (pickInfo && pickInfo.pickedMesh) {

            CurrentSelection = pickInfo.pickedMesh.name.split('HS Collider')[1];
            //alert(CurrentSelection)
            showUI = !showUI
            if (showUI) {
                document.getElementById("InfoboxHolder").style.opacity = "1"
                document.getElementById("InfoboxHolder").style.right = "2vw"
            }
            else {
                document.getElementById("InfoboxHolder").style.opacity = "0"
                document.getElementById("InfoboxHolder").style.right = "0vw"
            }
        }
    }
    return scene;
};
/******* End of the create scene function ******/

engine = createDefaultEngine();
if (!engine) throw 'engine should not be null.';
scene = createScene();;
sceneToRender = scene

let UpdateAnimRate = false
let AnimRate = 0
engine.runRenderLoop(function () {
    if (sceneToRender) {
        sceneToRender.render();
        var fpsLabel = document.getElementById("fpsLabel");
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
    }
    
    if (UpdateAnimRate) {
        AnimRate -= 0.03
        ChangeLabel(AnimRate)
    }
    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});

