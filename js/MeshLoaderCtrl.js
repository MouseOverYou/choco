var Jar_P, Nuts_P
var hdrTextureCity, hdrSkyboxMaterial, hdrSkybox,  CityEnvTask
var NutsAnim

function LoadAssets(scene, assetsManager) {


    //CanyonEnvTask
    CityEnvTask = assetsManager.addCubeTextureTask("CityEnvTask", "./assets/environment.dds");

    CityEnvTask.onSuccess = function (task) {
        hdrTextureCity = new BABYLON.CubeTexture.CreateFromPrefilteredData(task.texture.name, scene);
        //hdrTexture = task.texture
        hdrTextureCity.rotationY = 120 * (Math.PI / 180);
        hdrTextureCity.level = 1.5

        hdrSkyboxMaterial = new BABYLON.PBRMaterial("hdrSkyBox", scene);
        hdrSkyboxMaterial.backFaceCulling = false;
        hdrSkyboxMaterial.reflectionTexture = hdrTextureCity.clone();
        hdrSkyboxMaterial.reflectionTexture.level = 0.1
        hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        hdrSkyboxMaterial.microSurface = 1.0;
        hdrSkyboxMaterial.disableLighting = false;
        // Create Skybox
        hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
        hdrSkybox.visibility = 0
        hdrSkybox.material = hdrSkyboxMaterial;
        hdrSkybox.infiniteDistance = false;

    }
    CityEnvTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }


    Jar_P = new BABYLON.TransformNode("Jar_P");
    JarLoaderTask = assetsManager.addMeshTask("", "", "./assets/Jar.glb")

    JarLoaderTask.onSuccess = function (task) {

        task.loadedMeshes[0].position.x = 0
        task.loadedMeshes[0].position.y = 0
        task.loadedMeshes[0].position.z = 0
        task.loadedMeshes[0].rotationQuaternion = null;
        task.loadedMeshes[0].rotation.y = -90 * (Math.PI / 180)
        task.loadedMeshes[0].scaling = new BABYLON.Vector3(10,10, 10)
        task.loadedMeshes[0].parent = Jar_P
        Jar_P.scaling = new BABYLON.Vector3(0,0,0)
        Jar_P.rotation.y = -180 * (Math.PI / 180)

    }

    JarLoaderTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    Nuts_P = new BABYLON.TransformNode("Nuts_P");

    NutsLoaderTask = assetsManager.addMeshTask("", "", "./assets/Nuts animation.glb")

    NutsLoaderTask.onSuccess = function (task) {

        task.loadedMeshes[0].position.x = 0
        task.loadedMeshes[0].position.y = -0.06
        task.loadedMeshes[0].position.z = 0
        task.loadedMeshes[0].rotationQuaternion = null;
        task.loadedMeshes[0].rotation.y = 0 * (Math.PI / 180)
        task.loadedMeshes[0].scaling = new BABYLON.Vector3(1,1, 1)
        task.loadedMeshes[0].parent = Nuts_P
        Nuts_P.position.x = 0.1
        NutsAnim = task.loadedAnimationGroups[0]
        NutsAnim.stop()
        console.log(NutsAnim)

    }

    NutsLoaderTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }


    //FINISH

    var pbr
    assetsManager.onFinish = function (task) {
        CreateCustomMaterials()
        ChangeMaterialProperties()
        BufferStartAnim()
        StartExpAnimation()


        CreateLighting()
        AddShadows();

        SpawnHotspots();
    }
    //Asset Manager check
    assetsManager.onProgress = function (remainingCount, totalCount, lastFinishedTask) {
        engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
    };

    assetsManager.load();
}

