'use client';

import { CalendarIcon } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn, getDate, isDateFilterEmpty } from '@/lib/utils';
import { DateFilter, DateFilterOption } from '@/models/library/library-settings';
import { useLibraryFilters } from '@/hooks/useLibraryFilters';

enum DateOption {
  BEFORE = 'Before Date',
  AFTER = 'After Date',
  BETWEEN = 'In-Between Date'
}

const DateFilterPicker = ({dateFilterOption}: { dateFilterOption: DateFilterOption }) => {
  const getSelectedDateFilterValue = () => {
    switch (dateFilter) {
      case DateOption.BEFORE:
        return librarySettings.dateFilters[dateFilterOption]?.beforeDate;
      case DateOption.AFTER:
        return librarySettings.dateFilters[dateFilterOption]?.afterDate;
      case DateOption.BETWEEN:
      // Not handled here, hard-coded from: to: values below instead
      default:
        return;
    }
  };

  const { librarySettings, updateDateFilter } = useLibraryFilters();
  const [dateFilter, setDateFilter] = useState(DateOption.BEFORE);
  const [selectedDate, setSelectedDate] = useState(getSelectedDateFilterValue());
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined
  });

  const handleDateFilterChange = (newDateOption: DateOption) => {
    setDateFilter(newDateOption);
    const newDateFilter = {};
    updateDateFilter(dateFilterOption, newDateFilter);
  };

  const handleDateSelect = (date: any) => {
    if (dateFilter === DateOption.BETWEEN) {
      setDateRange(date);
      const newDateFilter: DateFilter = {
        beforeDate: undefined,
        afterDate: undefined,
        betweenDate: dateRange
      };
      updateDateFilter(dateFilterOption, newDateFilter);
    } else {
      setSelectedDate(date);

      if (date == null) {
        updateDateFilter(dateFilterOption, undefined);
        return;
      }

      const newDateFilter: DateFilter = {
        beforeDate: dateFilter === DateOption.BEFORE ? date : undefined,
        afterDate: dateFilter === DateOption.AFTER ? date : undefined,
        betweenDate: undefined
      };

      updateDateFilter(dateFilterOption, newDateFilter);
    }
  };

  const getDateString = () => {
    switch (dateFilter) {
      case DateOption.BEFORE:
      case DateOption.AFTER:
        return getDate(selectedDate);
      case DateOption.BETWEEN:
        return `${getDate(dateRange.from)} - ${getDate(dateRange.to)}`;
    }
  };

  return (
    <div className="flex w-full h-full gap-2 flex-wrap">
      <Select
        onValueChange={handleDateFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Before Date"/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={DateOption.BEFORE}>{DateOption.BEFORE}</SelectItem>
          <SelectItem value={DateOption.AFTER}>{DateOption.AFTER}</SelectItem>
          <SelectItem value={DateOption.BETWEEN}>{DateOption.BETWEEN}</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'min-w-fit justify-start text-left font-normal',
              !isDateFilterEmpty(librarySettings.dateFilters[dateFilterOption]) && 'text-muted-foreground',
              dateFilter === DateOption.BETWEEN && 'w-full'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4"/>
            {!isDateFilterEmpty(librarySettings.dateFilters[dateFilterOption]) ? getDateString() : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          {dateFilter === DateOption.BETWEEN ? (
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateSelect}
              toDate={new Date()}
              initialFocus
              captionLayout="dropdown-buttons"
              showOutsideDays
            />
          ) : (
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              toDate={new Date()}
              initialFocus
              showOutsideDays
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateFilterPicker;

