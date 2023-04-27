export const formatPlacement = (num: number) => {
    if (num.toString().endsWith("1") && !num.toString().endsWith("11")) {
      return num.toString() + "st";
    } else if (num.toString().endsWith("2") && !num.toString().endsWith("12")) {
      return num.toString() + "nd";
    } else if (num.toString().endsWith("3") && !num.toString().endsWith("13")) {
      return num.toString() + "rd";
    } else {
      return num.toString() + "th";
    }
  }
  