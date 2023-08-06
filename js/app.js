import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export const page_active = ref("accueil")
export const chansons = ref("")
export const audio = ref("")
export const chanson = ref("")
export const selection = ref("")
export const texte_recherche = ref("")
export const progression = ref(0)
export const balise_audio = ref(null)
export const volume = ref("")
export const current_time = ref(0)
export const duration = ref("")


fetch("data/chansons.json").then(resp => resp.json()).then(fichier => {
    chansons.value = fichier
})

//changer de page
export function changerPage(nom_page) {
    page_active.value = nom_page
}

//jouer une chanson
export function lancerLecteur(chanson) {
    selection.value = chanson
}

//filtrer les chanson: recherche
export function filtrer(chansons) {
    const chansons_filtres = chansons.filter(chanson => {
        const titre = chanson.titre.toLowerCase()
        const recherche = texte_recherche.value.toLowerCase()
        if (titre.includes(recherche)) {
            return true
        } else {
            return false
        }
    })
    return chansons_filtres
}

//mettre temps en minutes
export function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${padZero(minutes)}:${padZero(seconds)}`;
}

export function padZero(value) {
    return value.toString().padStart(2, "0");
}

//boutton play/pause
export function toggleJouer() {
    if (selection.value && selection.value.audio) {

        if (balise_audio.value.paused) {
            balise_audio.value.play()
        } else {
            balise_audio.value.pause()
        }
    }
}

//volume
export function volumeRange() {

    const volume_value = volume.value / 10;
    balise_audio.value.volume = volume_value
}

//progression de temps
export function timeupdate() {
    progression.value = (balise_audio.value.currentTime / balise_audio.value.duration) * 100
    current_time.value = (balise_audio.value.currentTime)
    duration.value = (balise_audio.value.duration)
   

}



