export interface FormState {
  errors: {
    [field: string]: string[] | undefined;
    _form?: string[];
  };
  success?: boolean;
}

export interface ActionResult {
  error?: string;
}
