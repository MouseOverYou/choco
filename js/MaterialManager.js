
let labelText = []

function CreateParticleTextures(){
    var hairParticles = new BABYLON.Texture("./assets/ParticleTextures/hair heart 3.png", scene)
    PartTexts.push(hairParticles)
    var collParticles = new BABYLON.Texture("./assets/ParticleTextures/coll spot.png", scene)
    PartTexts.push(collParticles)
    var omgParticles = new BABYLON.Texture("./assets/ParticleTextures/omg spot 1.png", scene)
    PartTexts.push(omgParticles)
    var dailyParticles = new BABYLON.Texture("./assets/ParticleTextures/daily spot.png", scene)
    PartTexts.push(dailyParticles)
    var flatterParticles = new BABYLON.Texture("./assets/ParticleTextures/flatter blume gruen 3.png", scene)
    PartTexts.push(flatterParticles)
    var redParticles = new BABYLON.Texture("./assets/ParticleTextures/red spot.png", scene)
    PartTexts.push(redParticles)
    var glowParticles = new BABYLON.Texture("./assets/ParticleTextures/glow heart 2.png", scene)
    PartTexts.push(glowParticles)

}

var labelMat, NutsMaterial, labelMat
function ChangeMaterialProperties() {

    var white = new BABYLON.Color3.FromHexString("#FFFFFF");
    var black = new BABYLON.Color3.FromHexString("#000000");

    var var_0 = new BABYLON.Texture("./assets/DiffuseMap.png", scene, true, false)
    labelText.push(var_0)
    var var_1 = new BABYLON.Texture("./assets/var_1.png", scene, true, false)
    labelText.push(var_1)
    var var_2 = new BABYLON.Texture("./assets/var_2.png", scene, true, false)
    labelText.push(var_2)
    var var_3 = new BABYLON.Texture("./assets/var_3.png", scene, true, false)
    labelText.push(var_3)
    var var_4 = new BABYLON.Texture("./assets/var_4.png", scene, true, false)
    labelText.push(var_4)
    var var_5 = new BABYLON.Texture("./assets/var_5.png", scene, true, false)
    labelText.push(var_5)
    var var_6 = new BABYLON.Texture("./assets/var_6.png", scene, true, false)
    labelText.push(var_6)

    let sceneMats = scene.materials;
    for (let mat of sceneMats) {
        if (mat.name == "hdrSkyBox" || mat.name == "BackgroundSkyboxMaterial" || mat.name =="BackgroundPlaneMaterial" || mat.name == "HotspotMat") {
            continue;
        }
        mat.reflectionTexture = hdrTextureCity;
        if(mat.name == "Glass Nutella"){
            mat.albedoColor = new BABYLON.Color3.FromHexString("#220802")
            var_0 = mat.albedoTexture;
            mat.metallic = 0
            mat.roughness = 1
            mat.alpha = 1
            mat.forceIrradianceInFragment = true;
            mat.clearCoat.isEnabled = true;
            mat.refractionTexture = hdrTextureCity;
            mat.linkRefractionWithTransparency = true;
            mat.indexOfRefraction = 0.52;
            mat.microSurface = 1;
        }


        else if(mat.name == "LabelMat"){
            labelMat = mat
            mat.metallic = 0
            mat.roughness = 0
            mat.metallicF0Factor = 0
        }
        else if(mat.name == "Decke"){
            mat.metallic = 0
            mat.roughness = 0
            mat.metallicF0Factor = 0
        }

        else if (mat.name == "FloorAO") {
            mat.opacityTexture = mat.albedoTexture;
            mat.opacityTexture .getAlphaFromRGB = true
            mat.albedoTexture = ""
            mat.transparencyMode = 2
            mat.albedoColor = black
            mat.unlit = true
        }
        else if(mat.name == "nuts Mat"){
            mat.metallic = 0
            mat.metallicF0Factor = 0
            mat.roughness = 0.5
            mat.transparencyMode = 2
            mat.alpha =0
            NutsMaterial = mat

        }
        else if(mat.name == "chocoMaterial"){
            chocoMat = mat
            mat.albedoColor = new BABYLON.Color3.FromHexString("#220802")
            mat.emissiveColor = new BABYLON.Color3.FromHexString("#170602")
            mat.roughness = 0.5
            mat.metallicF0Factor = 0
            mat.transparencyMode = 2
            mat.alpha = 0
            
            var noiseTexture = new BABYLON.NoiseProceduralTexture("perlin", 512, scene);
            noiseTexture.animationSpeedFactor = 1;
            noiseTexture.persistence = 1;
            noiseTexture.brightness = 0.9
            noiseTexture.octaves = 3;
            mat.albedoTexture = noiseTexture
        
            //chocoMat.bumpTexture = noiseTexture
            var fluidNRM = new BABYLON.Texture("./assets/lavaNRM.jpg", scene, true, true)
            fluidNRM.level = 0.25
            fluidNRM.vScale = 0.5
            mat.bumpTexture = fluidNRM


        }

    }


}

function CreateVideoTexture(name, url){
    var vidText = new BABYLON.VideoTexture(name, url, scene, true, false);
    vidText.vScale = -1
    vidText.video.pause()
    vidText.video.loop = false
    vidText.getAlphaFromRGB =true
    return vidText;
}

function UpdateEnvReflections(hdr){
    let sceneMats = scene.materials;
    for (let mat of sceneMats) {
        if (mat.name == "hdrSkyBox" || mat.name == "BackgroundSkyboxMaterial" || mat.name =="BackgroundPlaneMaterial") {
            continue;
        }

        mat.reflectionTexture = hdr;
    }

}
function scaleText(text, uValue, vValue, strength){
    text.uScale = uValue
    text.vScale = vValue
    if(strength == null){
        return
    }
    text.level = strength
}

var colMat, HSMat, chocoMat
function CreateCustomMaterials() {
    colMat = new BABYLON.StandardMaterial("colMat", scene)
    colMat.wireframe = true
    colMat.alpha = 0

    var hsText = new BABYLON.Texture("./assets/ui/hotspot.png", scene, true, true)
    HSMat = new BABYLON.PBRMaterial("HSMat", scene)
    HSMat.unlit = true
    HSMat.albedoTexture = hsText
    HSMat.opacityTexture = hsText

    /*
    var myChoco = BABYLON.MeshBuilder.CreateBox("myChoco", {height: 0.5, width: 0.02, depth: 5}, scene);
    myChoco.position.y = 1.5

    chocoMat = new BABYLON.PBRMaterial("chocoMat", scene)
    chocoMat.albedoColor = new BABYLON.Color3.FromHexString("#220802")
    chocoMat.metallic = 0
    chocoMat.roughness = 0.15

    myChoco.material = chocoMat
    
    var noiseTexture = new BABYLON.NoiseProceduralTexture("perlin", 512, scene);
    noiseTexture.animationSpeedFactor = 0.5;
    noiseTexture.persistence = 1;
    noiseTexture.brightness = 0.75
    noiseTexture.octaves = 4;

    //chocoMat.bumpTexture = noiseTexture
    chocoMat.albedoTexture = noiseTexture
    //chocoMat.emissiveTexture = noiseTexture
    */
    

    
}


