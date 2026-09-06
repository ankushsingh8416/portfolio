import "./projects.css";
import ProjectsView from "@/components/projects/ProjectsView";

export const metadata = {
  title: "Projects | Ankush Rajput",
  description:
    "A showcase of full-stack, LAMP-stack, and Android projects built by Ankush Rajput — e-commerce platforms, AI-powered tools, and client websites shipped end to end.",
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
