import { Close } from '@mui/icons-material';
import { DateRange } from 'react-date-range';
import { DateRangeIcon } from '@mui/x-date-pickers';
import { IconButton } from '@mui/material';
import { SimpleMenu } from 'presentation/atomic-component/atom/simple-menu';
import { colors } from 'presentation/style';
import { formatDate } from 'main/utils';
import { pt } from 'date-fns/locale';
import { useState } from 'react';
import type { FC } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface InputDateProps {
  endDate?: Date;
  startDate?: Date;
}

interface DatePickerProps {
  value: InputDateProps[];
  onChange: (newDate: InputDateProps | null) => void;
  disabled?: boolean;
  error?: boolean;
  side?: 'bottom' | 'left' | 'right' | 'top';
  label?: string;
  maxDate?: Date;
  register?: UseFormRegisterReturn;
}

export const DateRangeInput: FC<DatePickerProps> = ({
  onChange,
  error,
  register,
  maxDate,
  label,
  side,
  value,
  disabled
}) => {
  const formatDates = (dateToFormat: Date, isEnd?: boolean): Date => {
    return `${formatDate(dateToFormat, 'yyyy-MM-dd')}${isEnd ? 'T23:59:59.001' : 'T00:00:00.001'}` as unknown as Date;
  };

  const [isFirst, setIsFirst] = useState(value.length === 0);
  const [open, setOpen] = useState(false);

  return (
    <div className={'w-full min-w-[270px]'}>
      <SimpleMenu
        isOpen={open}
        openElement={
          <div
            className={`flex w-full cursor-pointer items-center justify-between pl-3 border rounded-[10px] min-h-[51px] ${error ? 'border-red' : 'border-gray-350'}`}
            onClick={(): void => {
              setIsFirst(true);
            }}
          >
            <div>
              {value.length === 0 ? (
                <span className={'text-gray-550'}>{label}</span>
              ) : (
                `${formatDate(value[0]?.startDate ?? '')} - ${value[0]?.endDate ? formatDate(value[0]?.endDate) : 'Hoje'}`
              )}
            </div>

            <div>
              {value.length > 0 ? (
                <IconButton
                  onClick={(event): void => {
                    event.stopPropagation();
                    if (!disabled) onChange(null);
                    setOpen(false);
                    setIsFirst(true);
                  }}
                  sx={{
                    zIndex: '50'
                  }}
                >
                  <Close color={error ? 'error' : undefined} />
                </IconButton>
              ) : null}

              <IconButton>
                <DateRangeIcon color={error ? 'error' : undefined} />
              </IconButton>
            </div>
          </div>
        }
        side={side ?? 'bottom'}
      >
        <DateRange
          {...register}
          endDatePlaceholder={'Fim'}
          locale={pt}
          maxDate={maxDate}
          onChange={(ranges): void => {
            const { range1 } = ranges as unknown as {
              range1: {
                endDate: Date;
                startDate: Date;
              };
            };

            if (range1) {
              onChange({
                endDate: isFirst ? undefined : formatDates(range1.endDate, true),
                startDate: formatDates(range1.startDate)
              });
              if (isFirst) setIsFirst(false);
            }
          }}
          rangeColors={[colors.primary]}
          ranges={
            value.length > 0
              ? [
                  {
                    endDate: new Date(value[0]?.endDate ?? ''),
                    showDateDisplay: true,
                    startDate: new Date(value[0]?.startDate ?? '')
                  }
                ]
              : [{ endDate: new Date(), showDateDisplay: true, startDate: new Date() }]
          }
          ref={register?.ref}
          startDatePlaceholder={'Início'}
        />
      </SimpleMenu>
    </div>
  );
};
