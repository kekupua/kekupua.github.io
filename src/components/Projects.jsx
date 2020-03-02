import React from 'react';
import projects from '../projects';

export const Projects = () => {
    return (
        <div>
            Projects
            {projects.map((project, index) => {
                return (
                    <div key={`project-${index}`}>
                        {project.content()}
                    </div>
                )
            })}
        </div>
    )
}

export default Projects;