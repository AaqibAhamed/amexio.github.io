/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AmexioMultipleDatePickerComponent } from '../multidatepicker/multidatepicker.component';
@Component({
    selector: 'amexio-date-range-picker',
    templateUrl: './multirangepicker.component.html',
 })
export class AmexioMultiRangePickerComponent implements OnInit, AfterViewInit {

    dateRangePickerFlag = true;
    newFromDate = new Date();
    newToDate = new Date();
    customRange: any[];
    fromCardSelected = false;
    toCardSelected = false;
    daysOptionToday: any;
    daysOptionYesterday: any;
    todayIconFlag: boolean;
    yesterdayIconFlag: boolean;
    disabledChkedIndex = 0;
    @Input('disabled-date') disabledDates: any = [];

    @ViewChild(AmexioMultipleDatePickerComponent) child: any;
    constructor() {
        this.customRange = ['Today', 'Yesterday', 'This week (sun - sat)', 'Last 14 days',
            'This month', 'Last 30 days', 'Last month', 'All time',
        ];
        this.disabledDates = [
            {
                from: '5-Sep-2019',
                to: '7-Sep-2019',
            },
        ];

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.fromCardSelected = this.child.fromcardselected;
        this.toCardSelected = this.child.tocardselected;
        this.child.altercompleteDaysArray();

        if (this.disabledDates) {
            // chk if today or yesterday are in list of disabled dates
            this.disabledDates.forEach((element: any) => {

                const dfrom = new Date(element.from);
                const dto = new Date(element.to);
                const currentd = new Date();
                const yesterdayd = new Date(currentd.getFullYear(), currentd.getMonth(), currentd.getDate() - 1);
                if ((currentd <= dto) && (currentd >= dfrom)) {
                    this.todayIconFlag = true;
                }
                if ((yesterdayd <= dto) && (yesterdayd >= dfrom)) {
                    this.yesterdayIconFlag = true;
                }
            });

            if (this.todayIconFlag) {
                //  update default frmdate and todate
                this.updateFromTodate();
            }
        }
    }

    updateFromTodate() {
        // increment and send date as argument to fun
        let flag = false;
        let incdate = new Date();

        do {
            incdate = new Date(incdate.getFullYear(), incdate.getMonth(), incdate.getDate() + 1);
            flag = this.chkDisableddate(incdate);
        } while (!flag);

        if (flag) {
            //  update from to date
            this.child.fromdate = incdate;
            this.child.todate = incdate;
            // update selected date in completeDaysArray
            this.alterCompleteDaysArray(incdate);
        }
    }

    chkDisableddate(incrementedDate: Date): boolean {
        // loop disabled days and if match found return true
        let retflag = false;
        this.disabledDates.forEach((element: any, index: number) => {
            const dfrom = new Date(element.from);
            const dto = new Date(element.to);
            // chk for match
            if (!(incrementedDate >= dfrom && incrementedDate <= dto)) {
                retflag = true;
            }
        });
        return retflag;
    }

    clearSelectedFlag() {
        this.child.completeDaysArray.forEach((month: any) => {
            month.montharray.forEach((monthrowarray: any) => {
                monthrowarray.forEach((individualday: any) => {
                    if (individualday.selected || individualday.from || individualday.to) {
                        individualday.selected = false;
                        individualday.from = false;
                        individualday.to = false;
                    }
                });
            });
        });
    }

    alterCompleteDaysArray(incdate: Date) {
        this.clearSelectedFlag();
        this.child.completeDaysArray.forEach((month: any) => {
            month.montharray.forEach((monthrowarray: any) => {
                monthrowarray.forEach((individualday: any) => {
                    if ((individualday.date.getFullYear() === incdate.getFullYear()) &&
                        (individualday.date.getMonth() === incdate.getMonth()) &&
                        (individualday.date.getDate() === incdate.getDate())) {

                        individualday.selected = true;
                        individualday.from = true;
                        individualday.to = true;
                    }
                });
                // });
            });
        });
    }

    selectRangeOption(option: any) {

        switch (option) {
            case 'Today':
                const currentdate = new Date();
                if (this.child.fromcardselected) {
                    // set fromdate to currentdate
                    this.child.fromdate = currentdate;

                }
                if (this.child.tocardselected) {
                    //  set todate to currentdate
                    this.child.todate = currentdate;
                }
                break;

            case 'Yesterday':
                const yesterdaydate = new Date();
                yesterdaydate.setDate(yesterdaydate.getDate() - 1);

                if (this.child.fromcardselected) {
                    // reinitialize fromdate to yesterday date
                    this.child.fromdate = yesterdaydate;
                }
                if (this.child.tocardselected) {
                    // reinitialize todate to yesterday date
                    this.child.todate = yesterdaydate;
                }
                break;

            case 'This week (sun - sat)':
                const startdate = new Date();
                const dayindex = startdate.getDay();
                const enddate = new Date();
                startdate.setDate(startdate.getDate() - dayindex);
                //  set frmdate
                this.child.fromdate = startdate;
                // set todate
                enddate.setDate(enddate.getDate() - dayindex + 6);
                this.child.todate = enddate;
                break;

            case 'Last 14 days':
                const lastday = new Date();
                this.child.todate = lastday;
                const firstday = new Date();
                firstday.setDate(firstday.getDate() - 14);
                this.child.fromdate = firstday;
                break;

            case 'This month':
                const d1 = new Date();
                const firstmonthday = new Date(d1.getFullYear(), d1.getMonth(), 1);
                this.child.fromdate = firstmonthday;
                const lastmonthday = new Date(d1.getFullYear(), d1.getMonth() + 1, 0);
                this.child.todate = lastmonthday;
                break;

            case 'Last 30 days':
                const d2 = new Date();
                const first30thdate = new Date();
                const last30thdate = new Date();
                this.child.todate = last30thdate;
                first30thdate.setDate(d2.getDate() - 29);
                this.child.fromdate = first30thdate;
                break;

            case 'Last month':
                const d3 = new Date();
                const fday = new Date(d3.getFullYear(), d3.getMonth() - 1, 1);
                const lday = new Date(d3.getFullYear(), d3.getMonth(), 0);
                this.child.fromdate = fday;
                this.child.todate = lday;
                break;

            case 'All time':
                const d4 = new Date();
                d4.setFullYear(1970);
                d4.setMonth(0);
                d4.setDate(1);
                this.child.fromdate = d4;
                this.child.todate = new Date();
                break;
        }
        this.child.altercompleteDaysArray();

    }

    ResetDaysTillToday() {
        const d = new Date();
        const newfrm = new Date(d.getFullYear(), d.getMonth(), (d.getDate() - this.daysOptionToday + 1));
        this.child.fromdate = newfrm;
        const newto = new Date();
        this.child.todate = newto;
        this.child.altercompleteDaysArray();
    }

    ResetDaysTillYesterday() {
        // change fromdate
        const d = new Date();
        const newfrm = new Date(d.getFullYear(), d.getMonth(), d.getDate() - this.daysOptionYesterday);
        this.child.fromdate = newfrm;
        // change todate
        const newto = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
        this.child.todate = newto;
        this.child.altercompleteDaysArray();
    }

}
