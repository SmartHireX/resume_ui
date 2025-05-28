import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";
import CreativeTemplate from "./CreativeTemplate";
import { TemplateId } from "./TemplateSelector";
import { ResumeTemplateProps } from "./TemplateInterface";

export { 
  ClassicTemplate,
  ModernTemplate,
  MinimalTemplate,
  CreativeTemplate
};

// Template registry for easy lookup by template ID
export const templates: Record<TemplateId, React.FC<ResumeTemplateProps>> = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate
};

export { default as TemplateSelector } from "./TemplateSelector";
export type { TemplateId } from "./TemplateSelector"; 