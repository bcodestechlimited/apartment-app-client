type PropertyProps = {
  title: string;
  price: string;
  type: string;
  img: string;
  details: string;
};

export default function PropertyCard({
  title,
  price,
  type,
  img,
  details,
}: PropertyProps) {
  return (
    <div className="bg-white rounded shadow w-72 overflow-hidden">
      <img src={img} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-gray-600">{type}</p>
        <p className="font-bold text-lg">{price}</p>
        <p className="text-sm text-gray-500">{details}</p>
      </div>
    </div>
  );
}
