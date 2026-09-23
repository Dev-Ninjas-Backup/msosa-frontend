export const WIDGETS_BULK_EVENT = "founder:widgets:bulk";
export const WIDGET_FORM_EVENT = "founder:widgets:form";
export const WIDGET_DEPLOY_EVENT = "founder:widgets:deploy";

export type WidgetFormAction = "draft" | "validate" | "publish" | "save" | "cancel";

export const WIDGETS_PATH = "/founder/widget-library";
export const WIDGET_CREATE_PATH = `${WIDGETS_PATH}/create`;
export const widgetPath = (id: string) => `${WIDGETS_PATH}/${id}`;
export const widgetEditPath = (id: string) => `${WIDGETS_PATH}/${id}/edit`;
