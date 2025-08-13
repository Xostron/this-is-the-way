import styles from './styles.module.css'
import { MapContainer, TileLayer, Marker, Polygon, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Исправление для иконок маркеров
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
	iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
	iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Карта leaflet (бесплатная)
export default function GeoMap() {
	// Широта, долгота
	const position: [number, number] = [48.76805, 44.8228]
	const address = 'Волгоградская область, г. Волжский, ул. Пушкина 103В'
	// Координаты полигона (массив точек [широта, долгота])
	const polygonCoords: [number, number][] = [
		[48.7684, 44.82322],
		[48.7680, 44.82232],
		[48.7678, 44.8225],
		[48.7682, 44.8234],
	]
	// Стили для полигона
	const stylePolygon = { color: 'purple' }
	return (
		<main className={styles.page_geomap_main}>
			<MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<Polygon pathOptions={stylePolygon} positions={polygonCoords}>
					<Popup>
						Это мой полигон! <br /> Красивая область.
					</Popup>
				</Polygon>
				<Marker position={position}>
					<Popup>Описание: {address}</Popup>
				</Marker>
			</MapContainer>
		</main>
	)
}
