//functio below gets day so the month for each year up to 2 more years

const calendarDaysInMonth = (): number[][] => {

    const year: number = new Date().getFullYear();

    const yearTwo: number = year + 1;

    const yearThree: number = year + 2;

    let yearOneArray: number[] = [];

    let yearTwoArray: number[] = [];

    let yearThreeArray: number[] = [];

    for (let i = 0; i < 12; i++) {

        const dayYearOne: number = new Date(year, i, 0).getDate();

        const dayYearTwo: number = new Date(yearTwo, i, 0).getDate();

        const dayYearThree: number  = new Date(yearThree, i, 0).getDate();

        yearOneArray.push(dayYearOne);

        yearTwoArray.push(dayYearTwo);

        yearThreeArray.push(dayYearThree);

    }

    return [yearOneArray, yearTwoArray, yearThreeArray];

   

}

 

//functio bellow gets a 2d array for each year of all the months first day starting position

const GetFirstDay = (calendarDaysFunc: Function): number[][] => {

    const daysArray: number[][] = calendarDaysFunc();

    const year: number = new Date().getFullYear();

    const yearTwo: number = year + 1;

    const yearThree: number = year + 2;

    const firstDayYearOne: number[] = [];

    const firstDayYearTwo: number[] = [];

    const firstDayYearThree: number[] = [];

    const firstDaysOfMonth: number[][] = [];

    //console.log(new Date(year, 0, 1).getDay());

    for (let i = 0; i < daysArray[0].length; i++) {

        let tempDate: number = new Date(year, i, 1).getDay();

        firstDayYearOne.push(tempDate);

        let tempDateTwo: number = new Date(yearTwo, i, 1).getDay();

        firstDayYearTwo.push(tempDateTwo);

        let tempDateThree: number = new Date(yearThree, i , 1).getDay();

        firstDayYearThree.push(tempDateThree);

    }

    firstDaysOfMonth.push(firstDayYearOne);

    firstDaysOfMonth.push(firstDayYearTwo);

    firstDaysOfMonth.push(firstDayYearThree);

    console.log(firstDaysOfMonth);

    return firstDaysOfMonth;

}

 

const monthDisplayArray = (monthSize: Function, daySize: Function, containerId: string) => {

    //this functiuon we will have logic for how months are displayed for each month

    const container: HTMLElement | null = document.getElementById(containerId);

    const monthMap = {};

    const sizeOfMonth: number[][] = monthSize();

    const daysOfMonth: number[][] = daySize(monthSize);

    //we will be skipping over the first month as we will be putting in blank boxes for the days before as we do not have that data yet

    /*for (let i = 1; i < sizeOfMonth.length; i++) {

        for (let x = 1; i < sizeOfMonth.length; i++) {

            if (daysOfMonth[i][x] > 0) {

                let monthPrevSize: number = sizeOfMonth[i][x - 1];

                let missingDayAmount: number = monthPrevSize - daysOfMonth[i][x];

            }

        }

    }*/

    for (let i = 0; i < sizeOfMonth[0].length; i++) {

        let currentMonthSize = sizeOfMonth[i];

       

    }

}

 

export {calendarDaysInMonth, GetFirstDay, monthDisplayArray};