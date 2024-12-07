import { WeatherData } from '@/api/types'
import { useFavorite } from '@/hooks/use-favorite'
import { Button } from './ui/button'
import { Star } from 'lucide-react'
import { toast } from 'sonner'

interface FavoriteButtonProps {
    data: WeatherData
}
const FavoriteButton = ({ data }: FavoriteButtonProps) => {
    const { addToFavorites, isFavorite, removeFavorites } = useFavorite()
    const isCurrentlyFavorite = isFavorite(data?.coord?.lat, data?.coord?.lon)

    const handleToggleFavorites = () => {
        if (isCurrentlyFavorite) {
            removeFavorites.mutate(`${data.coord.lat}-${data.coord.lon}`)
            toast.error(`Removed ${data.name} from favorites`)
        } else {
            addToFavorites.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country
            })
            toast.success(`Added ${data.name} to favorites`)
        }
    }

    return (
        <Button variant={isCurrentlyFavorite ? "default" : "outline"} onClick={handleToggleFavorites} size={'icon'} className={isCurrentlyFavorite ? 'bg-yellow-500 hover:bg-yellow-600' : ""}>
            <Star className={`h-4 w-4 ${isCurrentlyFavorite}?'fill-current':""`} />
        </Button>
    )
}

export default FavoriteButton