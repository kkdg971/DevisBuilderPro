/**
 * Design: Expressionnisme Technique
 * - Formes angulaires et inputs avec bordures épaisses
 * - Transitions expressives avec légères rotations
 * - Typographie technique (Work Sans)
 */

import { Question } from "../types/questionnaire";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

interface QuestionRendererProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
}

export function QuestionRenderer({ question, value, onChange }: QuestionRendererProps) {
  const renderInput = () => {
    switch (question.type) {
      case "number":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Input
                type="number"
                value={value ?? ""}
                onChange={(e) =>
                  onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                }
                min={question.min}
                max={question.max}
                step={question.step}
                className="flex-1 border-2 border-foreground/20 focus:border-[oklch(0.85_0.15_95)] transition-all duration-150"
                required={question.required}
              />
              {question.unit && (
                <span className="text-sm font-mono text-muted-foreground min-w-[3rem]">
                  {question.unit}
                </span>
              )}
            </div>
          </div>
        );

      case "text":
        return (
          <Input
            type="text"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="border-2 border-foreground/20 focus:border-[oklch(0.85_0.15_95)] transition-all duration-150"
            required={question.required}
          />
        );

      case "textarea":
        return (
          <textarea
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder || "Entrez votre description..."}
            rows={6}
            className="w-full p-3 border-2 border-foreground/20 focus:border-[oklch(0.85_0.15_95)] transition-all duration-150 rounded-lg bg-background text-foreground font-mono text-sm resize-none"
            required={question.required}
          />
        );

      case "section":
        return (
          <div className="py-4 border-t-2 border-foreground/10 mt-4">
            <h3 className="text-lg font-bold text-foreground">{question.label}</h3>
            {question.description && (
              <p className="text-sm text-muted-foreground mt-1">{question.description}</p>
            )}
          </div>
        );

      case "select":
        return (
          <Select value={value ?? ""} onValueChange={onChange}>
            <SelectTrigger className="border-2 border-foreground/20 focus:border-[oklch(0.85_0.15_95)] transition-all duration-150">
              <SelectValue placeholder="Sélectionner..." />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "boolean":
        return (
          <div className="flex items-center gap-3 p-4 border-2 border-foreground/20 rounded-lg hover:border-[oklch(0.85_0.15_95)] transition-all duration-150">
            <Switch
              checked={value ?? false}
              onCheckedChange={onChange}
              className="data-[state=checked]:bg-[oklch(0.85_0.15_95)]"
            />
            <span className="text-sm">{value ? "Oui" : "Non"}</span>
          </div>
        );

      case "multi-select":
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <div
                key={option.value}
                className="flex items-center gap-3 p-3 border-2 border-foreground/20 rounded-lg hover:border-[oklch(0.85_0.15_95)] transition-all duration-150 cursor-pointer"
                onClick={() => {
                  const currentValues = Array.isArray(value) ? value : [];
                  const newValues = currentValues.includes(option.value)
                    ? currentValues.filter((v) => v !== option.value)
                    : [...currentValues, option.value];
                  onChange(newValues);
                }}
              >
                <Checkbox
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onCheckedChange={(checked) => {
                    const currentValues = Array.isArray(value) ? value : [];
                    const newValues = checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v) => v !== option.value);
                    onChange(newValues);
                  }}
                  className="border-2"
                />
                <span className="text-sm flex-1">{option.label}</span>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  // Ne pas afficher les sections comme des questions normales
  if (question.type === "section") {
    return renderInput();
  }

  return (
    <div className="space-y-3 animate-fade-in" style={{ animationDelay: "50ms" }}>
      <div className="space-y-1">
        <Label className="text-base font-medium flex items-center gap-2">
          {question.label || question.question} {/* ✅ CORRIGÉ: Affiche question.label en priorité */}
          {question.required && <span className="text-[oklch(0.65_0.18_50)]">*</span>}
        </Label>
        {question.description && (
          <p className="text-sm text-muted-foreground">{question.description}</p>
        )}
      </div>
      {renderInput()}
    </div>
  );
}