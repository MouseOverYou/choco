let woodMat, LeuchteMat
let videoMats = []
let coatMat;
let daily_alphaSwoosh, coll_alphaSwoosh, hair_alphaSwoosh, omg1_alphaSwoosh, omg2_alphaSwoosh, red_alphaSwoosh

let PartTexts = []
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

function ChangeMaterialProperties() {

    var white = new BABYLON.Color3.FromHexString("#FFFFFF");
    var black = new BABYLON.Color3.FromHexString("#000000");

    let sceneMats = scene.materials;
    for (let mat of sceneMats) {
        if (mat.name == "hdrSkyBox" || mat.name == "BackgroundSkyboxMaterial" || mat.name =="BackgroundPlaneMaterial") {
            continue;
        }
        mat.reflectionTexture = hdrTextureCity;
        if(mat.name == "Glass Nutella"){
            mat.reflectionTexture = hdrTextureCity;
            mat.refractionTexture = hdrTextureCity;
            mat.metallic = 0
            mat.roughness = 0
            mat.linkRefractionWithTransparency = false;
            mat.indexOfRefraction = 0.52;
            mat.alpha = 0.2;
            mat.microSurface = 1;
            mat.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);
            mat.albedoColor = new BABYLON.Color3(0.85, 0.85, 0.85);
        }

        else if(mat.name == "Schoko Mat"){
            mat.albedoColor = new BABYLON.Color3.FromHexString("#350D03")
        }

        else if(mat.name == "Nutella Mat"){
            mat.metallic = 0
            mat.roughness = 0
            mat.metallicF0Factor = 0
        }
        else if(mat.name.startsWith('_',1)){
            mat.unlit = true
        }

        else if (mat.name == "Floor A") {
            mat.opacityTexture = mat.albedoTexture;
            mat.opacityTexture .getAlphaFromRGB = true
            mat.albedoTexture = ""
            mat.transparencyMode = 2
            mat.albedoColor = black
            mat.unlit = true
        }
        else if(mat.name == "Floor B"){
            mat.opacityTexture = mat.albedoTexture;
            mat.opacityTexture .getAlphaFromRGB = true
            mat.albedoTexture = ""
            mat.transparencyMode = 2
            mat.albedoColor = black
            mat.unlit = true
            
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

var colMat, HotspotMat, HotspotInfoMat
function CreateCustomMaterials() {
    colMat = new BABYLON.StandardMaterial("colMat", scene)
    colMat.wireframe = true
    colMat.alpha = 0

    /*
    var hsInfoText = new BABYLON.Texture("./assets/hotspot_info.png", scene, true, true)
    var hsText = new BABYLON.Texture("./assets/hotspot.png", scene, true, true)
    HotspotMat = new BABYLON.PBRMaterial("HotspotMat", scene)
    HotspotMat.unlit = true
    HotspotMat.albedoTexture = hsText
    HotspotMat.opacityTexture = hsText

    HotspotInfoMat = new BABYLON.PBRMaterial("HotspotInfoMat", scene)
    HotspotInfoMat.unlit = true
    HotspotInfoMat.albedoTexture = hsInfoText
    HotspotInfoMat.opacityTexture = hsInfoText
    */

    
}

function createVideoMat() {

    var videoMat = new BABYLON.PBRMaterial("videoMat", scene);
    videoMats.push(videoMat)
    var dotsText = new BABYLON.Texture("./assets/videoDots2.jpg", scene, true, false)
    var ambientScreen = new BABYLON.Texture("./assets/screenAmbient.jpg", scene, true, false)
    videoMat.ambientTexture = ambientScreen
    videoMat.bumpTexture = dotsText
    videoMat.bumpTexture.level = 0
    videoMat.bumpTexture.uScale = 1
    videoMat.bumpTexture.vScale = 1
    videoMat.emissiveColor = new BABYLON.Color3.FromHexString("#313131")
    videoMat.metallic = 0
    videoMat.roughness = 0

    return videoMat;
}

