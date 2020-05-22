var lightLinks, lightRechts, lightShadow
function CreateLighting() {
    lightLinks = new BABYLON.DirectionalLight("lightLinks", new BABYLON.Vector3(-90, -90, 90), scene);
    lightLinks.position = new BABYLON.Vector3(0, 2, -1);
    lightLinks.intensity = 1
    //lightLinks.shadowMinZ = -13

    lightRechts = new BABYLON.DirectionalLight("lightRechts", new BABYLON.Vector3(-90, -90, -90), scene);
    lightRechts.position = new BABYLON.Vector3(0, 2, 1);
    lightRechts.intensity = 1

    lightShadow = new BABYLON.DirectionalLight("lightShadow", new BABYLON.Vector3(0, -90, 0), scene);
    lightShadow.position = new BABYLON.Vector3(0, 2, 0);
    lightShadow.intensity = 0

}

let LightMesh
function EditMeshes() {
    //scene.getMeshByName("BackgroundPlane").position.y=-1.5
    scene.meshes.forEach(mesh => {
        //console.log(mesh.name)
        if (mesh.name == "BackgroundPlane") {
            mesh.position.y = -1.5
        }
    });
}

let generator
function AddShadows() {
    /*
    var groundShadow = BABYLON.Mesh.CreatePlane('groundShadow', 95, scene)
    groundShadow.rotation.x = Math.PI / 2
    groundShadow.position.y = 0.01
    groundShadow.material = new BABYLON.ShadowOnlyMaterial('shadowOnly', scene)
    groundShadow.material.alpha = 0.2
    groundShadow.receiveShadows = true
    */

    generator = new BABYLON.ShadowGenerator(4096 / 8, lightShadow);
    generator.usePercentageCloserFiltering = true;
    generator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_HIGH;
    generator.darkness = 1
    lightShadow.autoCalcShadowZBounds = true

    for (var i = 0; i < scene.meshes.length; i++) {
        if (scene.meshes[i].name.startsWith("Hazelnut")) {
            generator.addShadowCaster(scene.meshes[i]);

        }

    }

}

function AddGlow() {
    // Add lights to the scene
    var gl = new BABYLON.GlowLayer("glow", scene) //glow layer 
    gl.intensity = 1.5;
    scene.meshes.forEach(elem => {
        if (elem.name.startsWith("Screen_") || elem.name == "Video_Screens") {
            //gl.addExcludedMesh(elem)
        }
    });

}


var Hs_Plane_P
var HsPLaneList = []
function SpawnHotspots() {
    //Plane
    Hs_Plane_P = new BABYLON.TransformNode("Hs_Plane_P", scene)
    var hs0 = new Hotspot("0", new BABYLON.Vector3(0.25, 0.5, 0.75), HSMat, Hs_Plane_P)
    HsPLaneList.push(hs0.Mesh);

}


function DisableElems(list) {
    for (let elem of list) {
        elem.setEnabled(false)
    }
}

function EnableElems(list) {
    for (let elem of list) {
        elem.setEnabled(true)
    }
}