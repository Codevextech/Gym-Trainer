import { PageTransition, SectionHeading, Button } from '@/components/SharedUI';
import { usePrograms } from '@/hooks/use-programs';
import { Link } from 'wouter';

export default function Programs() {
  const { data: programs, isLoading } = usePrograms();

  return (
    <PageTransition>
      <SectionHeading title="Training Programs" subtitle="Find Your Path" />
      
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {programs?.map((program) => (
            <div key={program.id} className="glass-card rounded-2xl overflow-hidden hover-elevate flex flex-col">
              <div className="h-48 bg-muted relative">
                {program.imageUrl ? (
                  <img src={program.imageUrl} alt={program.title} className="w-full h-full object-cover opacity-80" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-card to-muted">
                    <span className="font-display text-4xl text-white/20 uppercase">{program.type}</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-primary text-white font-bold px-3 py-1 rounded-full text-sm">
                  {program.price}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-display font-bold uppercase mb-2">{program.title}</h3>
                <p className="text-muted-foreground flex-1 mb-6">{program.description}</p>
                <Link href="/membership">
                  <Button className="w-full">Join Program</Button>
                </Link>
              </div>
            </div>
          ))}
          {programs?.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12">
              No programs available at the moment. Check back soon!
            </div>
          )}
        </div>
      )}
    </PageTransition>
  );
}
