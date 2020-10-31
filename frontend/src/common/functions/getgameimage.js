import wow from '../../assets/images/wallpaper_wow.jpg'
import albion from '../../assets/images/wallpaper_albion.jpeg'

export default function getImage(game_name){
    switch(game_name.toLowerCase()){
        case "world of warcraft":
            return wow
        case "albion online":
            return albion
        default: 
            return wow
    }
}