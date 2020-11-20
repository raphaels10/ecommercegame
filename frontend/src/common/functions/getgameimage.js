import wow from '../../assets/images/wallpaper_wow.jpg'
import albion from '../../assets/images/wallpaper_albion.jpeg'
import runescape from '../../assets/images/wallpaper_runescape.jpg'

export default function getImage(game_name){
    switch(game_name.toLowerCase()){
        case "world of warcraft":
            return wow
        case "albion online":
            return albion
        case "runescape":
            return runescape
        default: 
            return null
    }
}