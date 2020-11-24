import wow from '../../assets/images/wallpaper_wow.jpg'
import albion from '../../assets/images/wallpaper_albion.jpeg'
import runescape from '../../assets/images/wallpaper_runescape.jpg'
import fallguys from '../../assets/images/wallpaper_fallguys.jpg'
import fortnite from '../../assets/images/wallpaper_fortnite.jpg'
import lol from '../../assets/images/wallpaper_lol.jpg'
import placeholder from '../../assets/images/placeholder.png'

export default function getImage(game_name){
    switch(game_name.toLowerCase()){
        case "world of warcraft":
            return wow
        case "albion online":
            return albion
        case "runescape":
            return runescape
        case "fall guys":
            return fallguys
        case "fortnite":
            return fortnite
        case "league of legends":
            return lol
        default: 
            return placeholder
    }
}