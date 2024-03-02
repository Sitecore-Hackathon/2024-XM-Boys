import {
  Field,
  ImageField,
  LinkField,
  SitecoreContextValue,
} from '@sitecore-jss/sitecore-jss-nextjs';

type SitecoreContext = {
  sitecoreContext: SitecoreContextValue;
};

export const hasContent = (
  ctx: SitecoreContext,
  field: LinkField | ImageField | Field<string>
): boolean => {
  if (ctx.sitecoreContext.pageEditing) return true;
  if (field === null || field === undefined) return false;
  if (!field.value) return false;
  if (Object.keys(field.value).includes('href')) {
    field = field as LinkField;
    return field.value?.href != '' ?? false;
  }
  if (Object.keys(field.value).includes('src')) {
    field = field as ImageField;
    return field.value?.href != '' ?? false;
  }
  return true;
};
