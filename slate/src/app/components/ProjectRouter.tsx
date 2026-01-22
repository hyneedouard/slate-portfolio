import { useState } from 'react';
import { DashboardProject } from '@/app/components/projects/DashboardProject';
import { EcommerceProject } from '@/app/components/projects/EcommerceProject';
import { ConfiguratorProject } from '@/app/components/projects/ConfiguratorProject';
import { LandingPageProject } from '@/app/components/projects/LandingPageProject';
import { BookingProject } from '@/app/components/projects/BookingProject';
import { CalculatorProject } from '@/app/components/projects/CalculatorProject';

export type ProjectType = 'dashboard' | 'ecommerce' | 'configurator' | 'landing' | 'booking' | 'calculator' | null;

interface ProjectRouterProps {
  currentProject: ProjectType;
  onBack: () => void;
}

export function ProjectRouter({ currentProject, onBack }: ProjectRouterProps) {
  if (!currentProject) return null;

  const projectComponents = {
    dashboard: DashboardProject,
    ecommerce: EcommerceProject,
    configurator: ConfiguratorProject,
    landing: LandingPageProject,
    booking: BookingProject,
    calculator: CalculatorProject,
  };

  const ProjectComponent = projectComponents[currentProject];

  return <ProjectComponent onBack={onBack} />;
}
