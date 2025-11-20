import { ExternalLink, Github, Link } from "lucide-react";
import { data } from "../lib/data";
import { HashLink } from "react-router-hash-link";

export const Projects: React.FC = () => {
  const PROJECTS = data.projects;
  return (
    <section id="projects" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <h2 className="text-sm font-bold text-brand-500 tracking-widest uppercase mb-3">My Work</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Featured Projects
          </h3>
          <p className="text-slate-600 text-lg mt-4">
            A selection of projects that demonstrate my technical expertise and problem-solving capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.heading}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col"
            >
              {/* Image Area */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.heading}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.routerLink && <HashLink className="p-2 bg-white rounded-full text-brand-900 hover:bg-brand-50 transition-colors" to={project.routerLink}>
                    <Link className="w-5 h-5" />
                  </HashLink>}
                  {project.href && <a className="p-2 bg-white rounded-full text-brand-900 hover:bg-brand-50 transition-colors" href={project.href} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-5 h-5" />
                  </a>}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex-1 flex flex-col gap-2">
                <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                  {project.heading}
                </h4>
                <p className="text-slate-600 mb-4 line-clamp-3 flex-1" title={project.description}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-brand-50 text-brand-700 text-xs font-medium rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
