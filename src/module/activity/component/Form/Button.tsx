import { DateTime } from 'luxon';
import { memo, useState, useMemo, useCallback } from 'react';

import { AlertColor, AlertText, Option } from '@/shared/entity';
import { approachOptions } from '@/shared/service';
import { useAlertStore } from '@/shared/store';
import { formFormatDatetimes } from '@/shared/util';

import { SharedProps as Props } from '.';
import { Activity, ActivityType, Payload } from '../../entity';
import { create, update } from '../../service';
import { useFormStore } from '../../store';

interface BuildPayloadContext {
  formType: number;
  activity: Activity | undefined;
}

// Check if form has any changes to show cancel confirmation
const checkIsChanged = (
  formType: number,
  selectedJuz: Option | undefined,
  selectedSurah: Option | Option[] | undefined,
  startAyah?: string,
  endAyah?: string
): boolean => {
  switch (formType) {
    case ActivityType.Juz:
      if (!selectedJuz) return false;
      break;
    case ActivityType.Surah:
      if (!selectedSurah) return false;
      break;
    case ActivityType.Ayah:
      if (!selectedSurah) return false;
      // Check if user has inputted any ayah number
      if (startAyah || endAyah) return true;
      break;
  }
  return true;
};

// Validate if form is ready to be saved with proper ayah validation
const checkIsSaveable = (
  formType: number,
  selectedJuz: Option | undefined,
  selectedSurah: Option | Option[] | undefined,
  startAyah?: string,
  endAyah?: string
): boolean => {
  switch (formType) {
    case ActivityType.Juz:
      if (!selectedJuz) return false;
      break;
    case ActivityType.Surah:
      if (!selectedSurah) return false;
      break;
    case ActivityType.Ayah:
      if (!selectedSurah) return false;
      // Both ayah inputs must be filled
      if (!startAyah || !endAyah) return false;
      const start: number = parseInt(startAyah);
      const end: number = parseInt(endAyah);
      // Validate both are valid numbers
      if (isNaN(start) || isNaN(end)) return false;
      // Ayah numbers must be at least 1
      if (start < 1 || end < 1) return false;
      // Start ayah must be less than or equal to end ayah
      if (start > end) return false;
      break;
  }
  return true;
};

const buildPayload = (p: Props, ctx: BuildPayloadContext): Payload => {
  switch (ctx.formType) {
    case ActivityType.Juz:
      return buildJuzPayload(p, ctx);
    case ActivityType.Surah:
      return buildSurahPayload(p, ctx);
    case ActivityType.Ayah:
      return buildAyahPayload(p, ctx);
    default:
      // @ts-expect-error expected return value
      return undefined;
  }
};

const buildJuzPayload = (p: Props, ctx: BuildPayloadContext): Payload => {
  return {
    ...(ctx.activity?.id && { id: ctx.activity.id }),
    activityType: ActivityType.Juz,
    ...(p.selectedJuz?.value && { juz: p.selectedJuz.value }),
    approachId: p.selectedApproach.value,
    repeat: 1,
    occuredAt: buildOccuredAt(p, ctx),
  };
};

const buildSurahPayload = (p: Props, ctx: BuildPayloadContext): Payload => {
  return {
    ...(ctx.activity?.id && { id: ctx.activity.id }),
    activityType: ActivityType.Surah,
    ...(ctx.activity?.surah && {
      surah: Array.isArray(p.selectedSurah) ? p.selectedSurah[0].value : p.selectedSurah?.value,
    }),
    ...(Array.isArray(p.selectedSurah) && { surahOptions: p.selectedSurah }),
    markJuzDone: p.isJuzDone,
    approachId: p.selectedApproach.value,
    repeat: p.repeat,
    occuredAt: buildOccuredAt(p, ctx),
  };
};

const buildAyahPayload = (p: Props, ctx: BuildPayloadContext): Payload => {
  return {
    ...(ctx.activity?.id && { id: ctx.activity.id }),
    activityType: ActivityType.Ayah,
    surah: Array.isArray(p.selectedSurah) ? p.selectedSurah[0].value : p.selectedSurah?.value,
    startAyah: parseInt(p.startAyah),
    endAyah: parseInt(p.endAyah),
    markSurahDone: p.isSurahDone,
    markJuzDone: p.isJuzDone,
    approachId: p.selectedApproach.value,
    repeat: p.repeat,
    occuredAt: buildOccuredAt(p, ctx),
  };
};

const buildOccuredAt = (p: Props, ctx: BuildPayloadContext): Date => {
  for (const format of formFormatDatetimes) {
    let dt: DateTime = DateTime.fromFormat(p.occuredAt, format);

    if (dt.isValid) {
      if (ctx.activity && checkActivityEqualsDateTime(ctx.activity, dt)) {
        return ctx.activity.occuredAt;
      }

      const now: DateTime = DateTime.now();
      dt = dt.set({
        second: now.second,
        millisecond: now.millisecond,
      });

      return dt.toJSDate();
    }
  }

  throw new Error('Invalid DateTime');
};

const checkActivityEqualsDateTime = (activity: Activity, dateTime: DateTime): boolean => {
  let parsedOccuredAt: DateTime = DateTime.fromJSDate(activity.occuredAt);
  parsedOccuredAt = parsedOccuredAt.set({
    second: 0,
    millisecond: 0,
  });

  return parsedOccuredAt.equals(dateTime);
};

// Memoized Button component to prevent unnecessary re-renders
export const Button: React.FC<Props> = memo((p: Props): React.JSX.Element => {
  const [isCancelConfirmationVisible, setIsCancelConfirmationVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showAlert } = useAlertStore();
  const { activity, formType, setActivity, setIsFormVisible, setParentSurah } = useFormStore();

  // Memoize form validation checks
  const isFormChanged: boolean = useMemo(
    () => checkIsChanged(formType, p.selectedJuz, p.selectedSurah, p.startAyah, p.endAyah),
    [formType, p.selectedJuz, p.selectedSurah, p.startAyah, p.endAyah]
  );

  const isSaveable: boolean = useMemo(
    () => checkIsSaveable(formType, p.selectedJuz, p.selectedSurah, p.startAyah, p.endAyah),
    [formType, p.selectedJuz, p.selectedSurah, p.startAyah, p.endAyah]
  );

  // Reset form to initial state
  const resetForm: () => void = useCallback((): void => {
    setActivity(undefined);
    setParentSurah([]);
    p.setSelectedJuz(undefined);
    p.setSelectedSurah(undefined);
    p.setSelectedApproach(approachOptions()[0]);
    p.setStartAyah('');
    p.setEndAyah('');
    p.setRepeat(1);
    p.setIsSurahDone(false);
    p.setIsJuzDone(false);
    setIsCancelConfirmationVisible(false);
  }, [setActivity, setParentSurah, p]);

  // Close form with animation delay
  const closeForm: () => void = useCallback((): void => {
    setIsFormVisible(false);
    setTimeout(resetForm, 500);
  }, [setIsFormVisible, resetForm]);

  // Handle save action
  const handleSave: () => Promise<void> = useCallback(async (): Promise<void> => {
    if (!isSaveable || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const payload: Payload = buildPayload(p, { formType, activity });

      if (activity) {
        await update(payload);
        showAlert(AlertColor.Green, AlertText.SuccessUpdatedActivity);
      } else {
        await create(payload);
        showAlert(AlertColor.Green, AlertText.SuccessCreatedActivity);
      }

      closeForm();
      await p.fetchData();
    } catch (err) {
      console.error('Failed to save activity:', err);
      showAlert(AlertColor.Red, AlertText.FailedCreatedActivity);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSaveable, isSubmitting, activity, formType, p, showAlert, closeForm]);

  // Handle cancel action with confirmation
  const handleCancel: () => void = useCallback((): void => {
    if (isFormChanged && !isCancelConfirmationVisible) {
      setIsCancelConfirmationVisible(true);
      setTimeout(() => setIsCancelConfirmationVisible(false), 2000);
      return;
    }
    closeForm();
  }, [isFormChanged, isCancelConfirmationVisible, closeForm]);

  return (
    <div className="flex flex-row-reverse gap-2 mt-4" role="group" aria-label="Form actions">
      <button
        type="button"
        className="px-6 py-2 enabled:bg-custom-teal enabled:hover:bg-teal-700 disabled:bg-gray-400 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-custom-teal focus:ring-offset-2"
        onClick={handleSave}
        disabled={!isSaveable || isSubmitting}
        aria-label={activity ? 'Update activity' : 'Save new activity'}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>

      <button
        type="button"
        className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        onClick={isCancelConfirmationVisible ? closeForm : handleCancel}
        aria-label={isCancelConfirmationVisible ? 'Confirm cancel' : 'Cancel form'}
      >
        {isCancelConfirmationVisible ? 'Confirm?' : 'Cancel'}
      </button>
    </div>
  );
});

Button.displayName = 'Button';
