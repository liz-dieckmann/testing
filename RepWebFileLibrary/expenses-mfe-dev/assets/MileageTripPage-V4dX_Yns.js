import { importShared } from "./__federation_fn_import-DD1J_cWq.js";
import { j as jsxRuntimeExports } from "./jsx-runtime-CzdF90_e.js";
import { E as ExpensesList } from "./ExpensesList-7OHRaeIU.js";
import { M as MILEAGE_DETAILS_SECTION, a as MILEAGE_JUSTIFICATION_SECTION, b as MILEAGE_COST_ALLOCATION_SECTION, c as MILEAGE_ADDITIONAL_COMMENTS_SECTION } from "./mileage-trip-sections-kLm5pVvc.js";
import { u as useFormFieldValues, e as useMileageRateSync, g as useReimbursableAmountSync, a as useAmountAllocationSync, M as MileageTripFormField, h as useMileageTripFormHandlers, m as mapMileageTripToDefaultValues, i as mileageTripValidationStrategy, C as ConfirmDialog } from "./CostAllocationSection-Bk0yrLMV.js";
import { c as createExpenseForm } from "./form-factory-Cn3SQIyI.js";
import { C as ChevronRight, u as useNavigate, f as useParams, a as RoutePaths } from "./routes-DvEMxMCl.js";
import { p as ps, f as fa, m as ma, h as ha, G as Ge, b as pa, v as vr, w as wr, S as Sr, l as ls } from "./createLucideIcon-DxTSH2Gc.js";
import { L as LoadingSpinner, k as useQueryClient, l as useQuery, q as queryKeys } from "./LoadingSpinner-DzAbLl2d.js";
import { C as ChevronLeft } from "./chevron-left-BGsFFFFd.js";
import { T as Trash2, S as Send } from "./trash-2-CtwvJI0N.js";
import { u as useMutation } from "./zod-Cw3ttKwp.js";
import { a as apiClient } from "./axiosInstance-Df66sy1J.js";
import { M as MILEAGE_ENDPOINTS } from "./config-BOIMHUBa.js";
const useMileageFormSync = ({
  control,
  setValue,
  getValues
}) => {
  const { mileageType, totalDistance, ratePerUnit, reimbursableAmount } = useFormFieldValues(
    control,
    [
      MileageTripFormField.MileageType,
      MileageTripFormField.TotalDistance,
      MileageTripFormField.RatePerUnit,
      MileageTripFormField.ReimbursableAmount
    ]
  );
  useMileageRateSync({
    mileageType: mileageType || "",
    setValue,
    getValues
  });
  useReimbursableAmountSync({
    totalDistance: totalDistance || "",
    ratePerUnit: ratePerUnit || "",
    setValue,
    getValues,
    reimbursableAmountField: MileageTripFormField.ReimbursableAmount
  });
  useAmountAllocationSync({
    amount: parseFloat(reimbursableAmount || "0"),
    setValue,
    getValues,
    costAllocationsField: MileageTripFormField.CostAllocations,
    isEqualSplitField: MileageTripFormField.IsEqualSplit
  });
};
const MILEAGE_TRIP_SECTIONS_CONFIG = [
  MILEAGE_DETAILS_SECTION,
  MILEAGE_JUSTIFICATION_SECTION,
  MILEAGE_COST_ALLOCATION_SECTION,
  MILEAGE_ADDITIONAL_COMMENTS_SECTION
];
const MileageTripForm = createExpenseForm({
  validationStrategy: mileageTripValidationStrategy,
  sections: MILEAGE_TRIP_SECTIONS_CONFIG,
  layout: "single-column",
  initialDataTransformer: mapMileageTripToDefaultValues,
  errorDisplayRenderer: ({ errors }) => {
    console.log(errors);
    return null;
  },
  customHook: useMileageFormSync,
  handlersHook: useMileageTripFormHandlers
});
MileageTripForm.displayName = "MileageTripForm";
const { useCallback: useCallback$1, useRef, useState: useState$1 } = await importShared("react");
function ExpenseFormDialog({
  formKey,
  title,
  formComponent: FormComponent,
  initialData,
  draftId,
  isSubmitting,
  isDrafting,
  draftSaveError,
  onSubmit,
  onSaveDraft,
  onDeleteDraft,
  onClose,
  isDraft: _isDraft,
  draftInfo,
  amountDisplay,
  statusBadge
}) {
  const formRef = useRef(null);
  const [submitButtonState, setSubmitButtonState] = useState$1({ disabled: true });
  const [saveDraftButtonState, setSaveDraftButtonState] = useState$1({ disabled: true });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState$1(false);
  const [isDeleting, setIsDeleting] = useState$1(false);
  const handleButtonStateChange = useCallback$1(
    (submitState, draftState) => {
      setSubmitButtonState(submitState);
      setSaveDraftButtonState(draftState);
    },
    []
  );
  const handleOpenChange = (open) => {
    if (!open) {
      onClose();
    }
  };
  const handleSaveDraftClick = (e) => {
    var _a;
    e.preventDefault();
    e.stopPropagation();
    (_a = formRef.current) == null ? void 0 : _a.saveDraft();
  };
  const handleSubmitClick = (e) => {
    var _a;
    e.preventDefault();
    e.stopPropagation();
    (_a = formRef.current) == null ? void 0 : _a.submitForm();
  };
  const handleDeleteDraft = () => {
    if (!draftId) return;
    setIsDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = async () => {
    if (!draftId || !onDeleteDraft) return;
    try {
      setIsDeleting(true);
      await onDeleteDraft();
      setIsDeleteDialogOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };
  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };
  const handleDeleteDialogOpenChange = (open) => {
    if (!open && isDeleting) {
      return;
    }
    setIsDeleteDialogOpen(open);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ps, { open: true, onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(fa, { className: "max-w-5xl max-h-[90vh] h-full overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ma, { className: "pb-3 mb-3 border-b border-exp-primary-blue-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-nowrap items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ha, { className: "text-exp-neutral-900 text-xl font-bold", children: title }),
            amountDisplay,
            statusBadge
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-nowrap items-center justify-center gap-2", children: draftId && draftInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-normal text-exp-neutral-300", children: [
            draftId,
            " • Created on",
            " ",
            new Date(draftInfo.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-7 top-[-38px] flex flex-nowrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Ge,
            {
              variant: "outlined",
              iconPosition: "center",
              className: "text-exp-neutral-70 hover:text-exp-neutral-200",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Ge,
            {
              variant: "outlined",
              iconPosition: "center",
              className: "text-exp-neutral-70 hover:text-exp-neutral-200",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-5" })
            }
          )
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative overflow-y-auto py-4 exp-custom-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FormComponent,
          {
            ref: formRef,
            onSubmit,
            onSaveDraft,
            onDraftSaved: () => {
            },
            initialData,
            draftId,
            isSubmitting,
            isDrafting,
            draftSaveError,
            onButtonStateChange: handleButtonStateChange
          },
          formKey
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(pa, { className: "pt-4 gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: draftId && onDeleteDraft && /* @__PURE__ */ jsxRuntimeExports.jsxs(vr, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(wr, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Ge,
              {
                type: "button",
                variant: "ghost",
                onClick: handleDeleteDraft,
                className: "text-red-600 hover:text-red-700",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }),
                  "Delete"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sr, { className: "text-sm", children: "Delete draft" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(vr, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(wr, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Ge,
                {
                  type: "button",
                  variant: "outlined",
                  onClick: handleSaveDraftClick,
                  disabled: saveDraftButtonState.disabled,
                  children: isDrafting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { className: "size-5" }),
                    "Save Draft"
                  ] }) : "Save Draft"
                }
              ) }) }),
              saveDraftButtonState.tooltip && /* @__PURE__ */ jsxRuntimeExports.jsx(Sr, { variant: "light", size: "sm", side: "bottom", showArrow: false, children: saveDraftButtonState.tooltip })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(vr, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(wr, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Ge,
                {
                  type: "button",
                  variant: "primary",
                  onClick: handleSubmitClick,
                  disabled: submitButtonState.disabled,
                  children: [
                    isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { className: "size-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-5" }),
                    "Submit Expense"
                  ]
                }
              ) }) }),
              submitButtonState.tooltip && /* @__PURE__ */ jsxRuntimeExports.jsx(Sr, { className: "text-sm", children: submitButtonState.tooltip })
            ] })
          ] })
        ] }) })
      ] })
    ] }) }),
    onDeleteDraft && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: isDeleteDialogOpen,
        onOpenChange: handleDeleteDialogOpenChange,
        title: "Delete draft",
        description: "Are you sure you want to delete this draft? This action cannot be undone.",
        confirmLabel: "Delete",
        cancelLabel: "Cancel",
        onConfirm: handleDeleteConfirm,
        onCancel: handleDeleteCancel,
        isLoading: isDeleting
      }
    )
  ] });
}
const useSaveMileageDraft = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, draftId }) => {
      const endpoint = draftId ? MILEAGE_ENDPOINTS.UPDATE_DRAFT(draftId) : MILEAGE_ENDPOINTS.SAVE_DRAFT;
      const method = draftId ? "put" : "post";
      const response = await apiClient[method](endpoint, { data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mileageDrafts.all() });
      ls.success("All changes are saved", {
        duration: 3e3
      });
    },
    onError: (error) => {
      console.error("Failed to save mileage draft:", error);
      ls.error("Failed to save. Please try again", {
        duration: 3e3
      });
    }
  });
};
const useSubmitMileage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }) => {
      const response = await apiClient.post(
        MILEAGE_ENDPOINTS.SUBMIT_MILEAGE,
        { data }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mileageTrips.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mileageDrafts.all() });
      ls.success("Mileage claim submitted", {
        duration: 3e3
      });
    },
    onError: (error) => {
      console.error("Failed to submit mileage:", error);
      ls.error("Fail to submit", {
        duration: 3e3
      });
    }
  });
};
const useMileageDraft = (draftId) => {
  return useQuery({
    queryKey: draftId ? queryKeys.mileageDrafts.detail(draftId) : queryKeys.mileageDrafts.details(),
    queryFn: async () => {
      if (!draftId) throw new Error("Draft ID is required");
      const response = await apiClient.get(
        MILEAGE_ENDPOINTS.GET_DRAFT(draftId)
      );
      return response.data;
    },
    enabled: !!draftId,
    retry: false,
    staleTime: 0
  });
};
const useDeleteMileageDraft = (options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (draftId) => {
      await apiClient.delete(MILEAGE_ENDPOINTS.DELETE_DRAFT(draftId));
    },
    onSuccess: () => {
      var _a;
      queryClient.invalidateQueries({ queryKey: queryKeys.mileageDrafts.all() });
      ls.success("Draft deleted", {
        duration: 3e3
      });
      (_a = options == null ? void 0 : options.onSuccess) == null ? void 0 : _a.call(options);
    },
    onError: (error) => {
      console.error("Failed to delete draft:", error);
      ls.error("Fail to delete. Please try again.", {
        duration: 3e3
      });
    }
  });
};
const { useCallback, useEffect, useState } = await importShared("react");
const truncateLocation = (location, maxLength = 30) => {
  if (!location || location.length <= maxLength) {
    return location;
  }
  return `${location.substring(0, maxLength)}...`;
};
const MileageTripPage = () => {
  var _a, _b;
  const navigate = useNavigate();
  const { id } = useParams();
  const [stableFormKey] = useState(() => id || "new");
  const saveDraftMutation = useSaveMileageDraft();
  const submitMileageMutation = useSubmitMileage();
  const deleteDraftMutation = useDeleteMileageDraft({
    onSuccess: () => {
      setTimeout(() => {
        navigate(RoutePaths.Expenses);
      }, 100);
    }
  });
  const shouldFetchDraft = id && id !== "new";
  const { data: existingDraft, error: draftError, isLoading: isDraftLoading } = useMileageDraft(shouldFetchDraft ? id : null);
  const draftData = draftError || !existingDraft ? null : existingDraft;
  const mileageTripTitle = ((_a = draftData == null ? void 0 : draftData.data) == null ? void 0 : _a.toLocation) ? `Mileage ${truncateLocation(draftData.data.toLocation)}` : "New Mileage Claim";
  const isDraft = !!draftData;
  const currentDraftId = shouldFetchDraft && !draftError && (draftData || isDraftLoading) ? id : null;
  useEffect(() => {
    if (draftError && shouldFetchDraft) {
      navigate(RoutePaths.ExpensesNewMileageTrip, { replace: true });
    }
  }, [draftError, shouldFetchDraft, navigate]);
  const handleSubmit = async (data) => {
    try {
      await submitMileageMutation.mutateAsync({ data });
      navigate(RoutePaths.Expenses);
    } catch (error) {
      console.error("Failed to submit mileage trip:", error);
    }
  };
  const handleSaveDraft = async (data) => {
    try {
      const result = await saveDraftMutation.mutateAsync({
        data,
        draftId: currentDraftId || void 0
      });
      if (result.id && !currentDraftId) {
        navigate(RoutePaths.ExpensesMileageTripId.replace(":id", result.id), { replace: true });
      }
    } catch (error) {
      console.error("Failed to save mileage trip draft:", error);
    }
  };
  const handleDeleteDraft = useCallback(async () => {
    if (!currentDraftId) return;
    await deleteDraftMutation.mutateAsync(currentDraftId);
  }, [currentDraftId, deleteDraftMutation]);
  const handleClose = () => {
    navigate(RoutePaths.Expenses);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ExpensesList, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExpenseFormDialog,
      {
        formKey: stableFormKey,
        title: mileageTripTitle,
        formComponent: MileageTripForm,
        initialData: draftData == null ? void 0 : draftData.data,
        draftId: currentDraftId,
        isSubmitting: submitMileageMutation.isPending,
        isDrafting: saveDraftMutation.isPending,
        draftSaveError: saveDraftMutation.isError,
        onSubmit: handleSubmit,
        onSaveDraft: handleSaveDraft,
        onDeleteDraft: currentDraftId ? handleDeleteDraft : void 0,
        onClose: handleClose,
        isDraft,
        draftInfo: draftData ? { createdAt: draftData.createdAt } : void 0,
        amountDisplay: ((_b = draftData == null ? void 0 : draftData.data) == null ? void 0 : _b.reimbursableAmount) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-medium text-exp-neutral-900", children: [
          "$",
          draftData.data.reimbursableAmount
        ] }),
        statusBadge: isDraft && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-0.5 bg-exp-yellow-200 text-exp-yellow-900 text-sm font-medium rounded-20", children: "DRAFT" })
      }
    )
  ] });
};
export {
  MileageTripPage as default
};
