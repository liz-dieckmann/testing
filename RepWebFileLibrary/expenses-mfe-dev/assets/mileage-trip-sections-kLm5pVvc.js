import { j as jsxRuntimeExports } from "./jsx-runtime-CzdF90_e.js";
import { u as useFormFieldValues, M as MileageTripFormField, z as mileageDetailsSchema, F as FormSectionType, A as mileageJustificationSchema, v as costAllocationSchema, w as additionalCommentsSchema, x as CostAllocationHeaderActions, y as CostAllocationSection } from "./CostAllocationSection-Bk0yrLMV.js";
import { e as ea, t as na, E as ta, Q as Qo, M as Ma } from "./createLucideIcon-DxTSH2Gc.js";
import "./api-BFGhbNt_.js";
import "./LoadingSpinner-DzAbLl2d.js";
import { a as useDefaultCompany } from "./api-ClLgEOB8.js";
import { c as useBusinessPurposes } from "./api-CgkjvIkG.js";
import { C as Controller } from "./zod-Cw3ttKwp.js";
import { I as Icon } from "./Icon-DYEjfqv0.js";
const BusinessPurposeSelect = ({
  value,
  onChange,
  onBlur,
  required = true,
  disabled = false,
  placeholder = "Select business purpose",
  error
}) => {
  const { company, isLoading: isLoadingCompany } = useDefaultCompany();
  const companyId = (company == null ? void 0 : company.shortName) || null;
  const { data: businessPurposes, isLoading: isLoadingPurposes } = useBusinessPurposes(companyId, false);
  const options = (businessPurposes == null ? void 0 : businessPurposes.map((bp) => ({
    value: bp.id,
    label: bp.businessPurpose
  }))) || [];
  const isLoading = isLoadingCompany || isLoadingPurposes;
  const displayPlaceholder = isLoadingCompany ? "Loading company..." : isLoadingPurposes ? "Loading business purposes..." : !companyId ? "No company selected" : placeholder;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ea,
    {
      label: "Business purpose",
      placeholder: displayPlaceholder,
      options,
      value,
      onValueChange: onChange,
      onBlur,
      required,
      disabled: disabled || isLoading || !companyId,
      error
    }
  );
};
const AdditionalCommentsSection = ({
  control,
  disabled = false
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Controller,
    {
      name: "additionalComments",
      control,
      render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        na,
        {
          ...field,
          placeholder: "Add any additional comments...",
          rows: 1,
          value: field.value || "",
          disabled
        }
      )
    }
  ) });
};
const MILEAGE_OPTIONS = [
  { value: "mileage-0", label: "Test" },
  { value: "mileage-1", label: "Business Mileage" },
  { value: "mileage-2", label: "Personal Vehicle - Business Use" },
  { value: "mileage-3", label: "Company Vehicle Mileage" }
];
const MileageTypeSelect = ({
  value,
  onChange,
  onBlur,
  required = true,
  disabled = false,
  placeholder = "Select mileage type",
  error
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ea,
    {
      label: "Mileage type",
      placeholder,
      options: MILEAGE_OPTIONS,
      value,
      onValueChange: onChange,
      onBlur,
      required,
      disabled,
      error
    }
  );
};
const MileageDetailsSection = ({
  control,
  disabled = false
}) => {
  const { ratePerUnit, rateUnit, reimbursableAmount } = useFormFieldValues(control, [
    MileageTripFormField.RatePerUnit,
    MileageTripFormField.RateUnit,
    MileageTripFormField.ReimbursableAmount
  ]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Controller,
        {
          name: MileageTripFormField.MileageType,
          control,
          render: ({ field, fieldState }) => {
            var _a;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              MileageTypeSelect,
              {
                value: field.value || "",
                onChange: field.onChange,
                onBlur: field.onBlur,
                error: (_a = fieldState.error) == null ? void 0 : _a.message,
                required: true,
                disabled
              }
            );
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Controller,
        {
          name: MileageTripFormField.ExpenseDate,
          control,
          render: ({ field, fieldState }) => {
            var _a;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              ta,
              {
                label: "Expense date",
                placeholder: "Select date mileage incurred",
                value: field.value ? new Date(field.value) : void 0,
                onChange: (date) => field.onChange(date ? date.toISOString() : ""),
                onBlur: field.onBlur,
                error: (_a = fieldState.error) == null ? void 0 : _a.message,
                required: true,
                disabled
              }
            );
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Controller,
        {
          name: MileageTripFormField.FromLocation,
          control,
          render: ({ field, fieldState }) => {
            var _a;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              Qo,
              {
                label: "From",
                placeholder: "Specify origin location",
                ...field,
                value: field.value || "",
                error: (_a = fieldState.error) == null ? void 0 : _a.message,
                required: true,
                disabled,
                maxCharacters: 100,
                showCharacterCount: true,
                enforceMaxLength: true
              }
            );
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center absolute top-0 right-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Controller,
          {
            name: MileageTripFormField.IsRoundTrip,
            control,
            render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Ma,
              {
                label: "Round trip",
                checked: field.value,
                onCheckedChange: field.onChange,
                disabled
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Controller,
          {
            name: MileageTripFormField.ToLocation,
            control,
            render: ({ field, fieldState }) => {
              var _a;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                Qo,
                {
                  label: "To",
                  placeholder: "Specify destination location",
                  ...field,
                  value: field.value || "",
                  error: (_a = fieldState.error) == null ? void 0 : _a.message,
                  required: true,
                  disabled,
                  maxCharacters: 100,
                  showCharacterCount: true,
                  enforceMaxLength: true
                }
              );
            }
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Controller,
        {
          name: MileageTripFormField.TotalDistance,
          control,
          render: ({ field, fieldState }) => {
            var _a;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              Qo,
              {
                label: `Total distance${rateUnit ? ` (${rateUnit})` : ""}`,
                placeholder: "0.00",
                ...field,
                value: field.value || "",
                type: "number",
                step: "0.01",
                min: "0",
                error: (_a = fieldState.error) == null ? void 0 : _a.message,
                required: true,
                disabled
              }
            );
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Qo,
        {
          label: "Rate",
          value: ratePerUnit ? `$ ${ratePerUnit} per ${rateUnit || "unit"}` : "",
          disabled: true,
          readOnly: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Qo,
        {
          label: "Reimbursable amount",
          value: reimbursableAmount ? `$ ${reimbursableAmount} CAD` : "$ CAD",
          disabled: true,
          readOnly: true
        }
      )
    ] })
  ] });
};
const MileageJustificationSection = ({
  control,
  disabled = false
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Controller,
      {
        name: MileageTripFormField.BusinessPurpose,
        control,
        render: ({ field, fieldState }) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            BusinessPurposeSelect,
            {
              value: field.value || "",
              onChange: field.onChange,
              onBlur: field.onBlur,
              error: (_a = fieldState.error) == null ? void 0 : _a.message,
              required: true,
              disabled
            }
          );
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Controller,
      {
        name: MileageTripFormField.ExpenseDescription,
        control,
        render: ({ field, fieldState }) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            na,
            {
              label: "Expense description",
              placeholder: "Add any additional details about this claim",
              ...field,
              value: field.value || "",
              error: (_a = fieldState.error) == null ? void 0 : _a.message,
              required: true,
              disabled,
              maxLength: 500,
              rows: 4
            }
          );
        }
      }
    )
  ] });
};
const MILEAGE_DETAILS_SECTION = {
  id: "mileage-details",
  type: FormSectionType.MileageDetails,
  title: "MILEAGE DETAILS",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "map", className: "w-4 h-4 text-trax-neutral-950" }),
  iconClassName: "flex p-0 size-6 max-h-6 max-w-6 justify-center items-center",
  required: true,
  order: 1,
  schema: mileageDetailsSchema,
  render: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(MileageDetailsSection, { ...props })
};
const MILEAGE_JUSTIFICATION_SECTION = {
  id: "mileage-justification",
  type: FormSectionType.MileageJustification,
  title: "MILEAGE JUSTIFICATION",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "sticky_note_2", className: "w-4 h-4 text-trax-neutral-950" }),
  iconClassName: "bg-trax-blue-100 flex p-0 size-6 max-h-6 max-w-6 justify-center items-center",
  required: true,
  order: 2,
  schema: mileageJustificationSchema,
  render: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(MileageJustificationSection, { ...props })
};
const MILEAGE_COST_ALLOCATION_FIELD_CONFIG = {
  totalAmountField: "reimbursableAmount",
  costAllocationsField: "costAllocations",
  isEqualSplitField: "isEqualSplit",
  defaultCurrencyCode: "CAD"
};
const MILEAGE_COST_ALLOCATION_SECTION = {
  id: "cost-allocation",
  type: FormSectionType.CostAllocation,
  title: "COST ALLOCATION",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "add_chart", className: "w-4 h-4 text-trax-neutral-950" }),
  iconClassName: "bg-trax-yellow-600 flex p-0 size-6 max-h-6 max-w-6 justify-center items-center",
  required: false,
  order: 3,
  requiresHandlers: true,
  schema: costAllocationSchema,
  render: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(CostAllocationSection, { ...props, fieldConfig: MILEAGE_COST_ALLOCATION_FIELD_CONFIG }),
  headerActions: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    CostAllocationHeaderActions,
    {
      control: props.control,
      setValue: props.setValue,
      disabled: props.disabled,
      helpers: props.helpers,
      fieldConfig: MILEAGE_COST_ALLOCATION_FIELD_CONFIG
    }
  ),
  isEnabled: (formValues) => {
    const reimbursableAmount = parseFloat(formValues.reimbursableAmount || "0");
    const hasAllocations = (formValues.costAllocations || []).length > 0;
    return hasAllocations || reimbursableAmount > 0;
  },
  dependsOn: [MileageTripFormField.ReimbursableAmount, MileageTripFormField.CostAllocations, MileageTripFormField.IsEqualSplit]
};
const MILEAGE_ADDITIONAL_COMMENTS_SECTION = {
  id: "additional-comments",
  type: FormSectionType.AdditionalComments,
  title: "ADDITIONAL COMMENTS",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "textsms", className: "w-4 h-4 text-trax-neutral-950" }),
  iconClassName: "bg-trax-violet-100 flex p-0 size-6 max-h-6 max-w-6 justify-center items-center",
  required: false,
  order: 4,
  schema: additionalCommentsSchema,
  render: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(AdditionalCommentsSection, { ...props })
};
export {
  AdditionalCommentsSection as A,
  BusinessPurposeSelect as B,
  MILEAGE_DETAILS_SECTION as M,
  MILEAGE_JUSTIFICATION_SECTION as a,
  MILEAGE_COST_ALLOCATION_SECTION as b,
  MILEAGE_ADDITIONAL_COMMENTS_SECTION as c
};
