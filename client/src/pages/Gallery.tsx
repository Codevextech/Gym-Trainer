import { PageTransition, SectionHeading } from '@/components/SharedUI';

export default function Gallery() {
  const images = [
    { src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop", span: "md:col-span-2 md:row-span-2" },
    { src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop", span: "col-span-1" },
    { src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop", span: "col-span-1" },
    { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop", span: "col-span-1" },
    { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop", span: "col-span-1" },
    { src: "https://images.unsplash.com/photo-1526506159807-6c003fa87852?q=80&w=800&auto=format&fit=crop", span: "md:col-span-2" },
  ];

  return (
    <PageTransition>
      <SectionHeading title="Transformations" subtitle="The Gallery" />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
        {images.map((img, i) => (
          <div key={i} className={`group relative rounded-xl overflow-hidden bg-muted aspect-square ${img.span}`}>
            <img 
              src={img.src} 
              alt="Gym Gallery" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
