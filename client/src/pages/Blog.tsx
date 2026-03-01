import React from 'react';
import { PageTransition, SectionHeading, Button } from '@/components/SharedUI';
import { useQuery } from '@tanstack/react-query';
import { api } from '@shared/routes';
import { Calendar } from 'lucide-react';

export default function Blog() {
  const { data: blogs, isLoading } = useQuery({
    queryKey: [api.blogs.list.path],
    queryFn: async () => {
      const res = await fetch(api.blogs.list.path);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return api.blogs.list.responses[200].parse(await res.json());
    },
  });

  return (
    <PageTransition>
      <SectionHeading title="Fitness Insights" subtitle="Our Blog" />
      
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
          {blogs?.map((blog) => (
            <div key={blog.id} className="glass-card rounded-2xl overflow-hidden hover-elevate group">
              <div className="h-56 bg-muted relative overflow-hidden">
                {/* fallback fitness image if none provided */}
                <img 
                  src={blog.imageUrl || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop"} 
                  alt={blog.title} 
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider mb-4">
                  <Calendar className="w-4 h-4" />
                  {new Date(blog.createdAt!).toLocaleDateString()}
                </div>
                <h3 className="text-2xl font-display font-bold uppercase mb-3 text-foreground line-clamp-2">{blog.title}</h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">{blog.content}</p>
                <Button variant="outline" className="w-full">Read Article</Button>
              </div>
            </div>
          ))}
          {blogs?.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12">
              No articles published yet. Check back soon!
            </div>
          )}
        </div>
      )}
    </PageTransition>
  );
}
