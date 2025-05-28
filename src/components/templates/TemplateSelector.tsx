import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export type TemplateId = "classic" | "modern" | "minimal" | "creative";

export interface TemplateSelectorProps {
  selectedTemplate: TemplateId;
  onTemplateChange: (templateId: TemplateId) => void;
}

const templateOptions = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional resume layout with clean formatting",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with balanced whitespace",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Streamlined layout focusing on essential information",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design with distinctive visual elements",
  },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange,
}) => {
  return (
    <Card className="mb-4 no-print">
      <CardContent className="pt-4">
        <RadioGroup
          value={selectedTemplate}
          onValueChange={(value) => onTemplateChange(value as TemplateId)}
          className="flex flex-wrap gap-2 sm:gap-4"
        >
          {templateOptions.map((template) => (
            <div key={template.id} className="flex items-start space-x-2">
              <RadioGroupItem
                value={template.id}
                id={`template-${template.id}`}
                className="mt-1"
              />
              <div>
                <Label
                  htmlFor={`template-${template.id}`}
                  className="font-medium text-sm"
                >
                  {template.name}
                </Label>
                <p className="text-xs text-muted-foreground">
                  {template.description}
                </p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector; 