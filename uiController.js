//UI CONTROLLER
var UIController = (function() {
    var DOMStrings = {
      inputType: ".add__type",
      inputDescription: ".add__description",
      inputValue: ".add__value",
      inputButton: ".add__btn",
      incomeContainer: ".income__list",
      expensesContainer: ".expenses__list",
      budgetTotal: ".budget__value",
      budgetInc: ".budget__income--value",
      budgetExp: ".budget__expenses--value",
      budgetPercentage: ".budget__expenses--percentage",
      itemPercentage: ".item__percentage",
      budgetLabel: ".budget__value",
      incomeLabel: ".budget__income--value",
      expensesLabel: ".budget__expenses--value",
      percentageLabel: ".budget__expenses--percentage",
      container: ".container",
      dateLabel: ".budget__title--month"
    };
  
    var formatNumber = function(num, type) {
      var numSplit, int, dec;
      /*
       + or - before the number
       exactly 2 decimal points
       comma separating the thousands
  
       2310.4567  -> +2,310.46
       2000 -> 2,000.00
       */
  
      num = Math.abs(num);
      num = num.toFixed(2);
      numSplit = num.split(".");
      int = numSplit[0];
      if (int.length > 3) {
        int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3); //input 2310, output 2,310
      }
      dec = numSplit[1];
  
      return (
        (type === "exp" ? (sign = "-") : (sign = "+")) + " " + int + "." + dec
      );
    };
  
    var nodeListForEach = function(list, callback) {
      for (var i = 0; i < list.length; i++) {
        callback(list[i], i);
      }
    };
  
    return {
      getInput: function() {
        return {
          type: document.querySelector(DOMStrings.inputType).value, // Will be either inc or exp
          description: document.querySelector(DOMStrings.inputDescription).value, // description of item
          value: parseFloat(document.querySelector(DOMStrings.inputValue).value) // numerical value of the item
        };
      },
  
      addListItem: function(obj, type) {
        var html, newHtml, element;
  
        // Create HTML string with placeholder text
        if (type === "inc") {
          element = DOMStrings.incomeContainer;
          html = `<div class="item-inc" id="inc-%id%"><div class="item__description">%description%</div>
              <div class=""> <div class="item__value">%value%</div>
              <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>
              </div>`;
        } else if (type === "exp") {
          element = DOMStrings.expensesContainer;
          html = `<div class="item-exp" id="exp-%id%"><input type="date" class="date-due"/><br><div class="item__description">%description%</div>
              <div class="item"><div class="item__value">%value%</div>
              <div class="item__percentage"></div><div class="item__delete">
            </div>
              <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>`
        }
  
        // Replace placeholder text with data
        newHtml = html.replace("%id%", obj.id);
        newHtml = newHtml.replace("%description%", obj.description);
        newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));
       
  
        // Insert HTML into the DOM
        document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
      },
  
      deleteListItem: function(selectorID) {
        var el = document.getElementById(selectorID);
        document.getElementById(selectorID).parentNode.removeChild(el);
      },
  
      clearFields: function() {
        var fields, fieldsArr;
        fields = document.querySelectorAll(
          DOMStrings.inputDescription + ", " + DOMStrings.inputValue
        );
  
        fieldsArr = Array.prototype.slice.call(fields);
  
        fieldsArr.forEach(function(current, index, array) {
          current.value = "";
        });
  
        fieldsArr[0].focus();
      },
      displayBudget: function(obj) {
        var type;
        obj.budget > 0 ? (type = "inc") : (type = "exp");
  
        document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(
          obj.budget,
          type
        );
        document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(
          obj.totalInc,
          "inc"
        );
        document.querySelector(
          DOMStrings.expensesLabel
        ).textContent = formatNumber(obj.totalExp, "exp");
  
        if (obj.percentage > 0) {
          document.querySelector(DOMStrings.percentageLabel).textContent =
            obj.percentage + "%";
        } else {
          document.querySelector(DOMStrings.percentageLabel).textContent = "---";
        }
      },
  
      displayPercentages: function(percentages) {
        var fields = document.querySelectorAll(DOMStrings.itemPercentage);
        nodeListForEach(fields, function(current, index) {
          if (percentages[index] > 0) {
            current.textContent = percentages[index] + "%";
          } else {
            current.textContent = "---";
          }
        });
      },
  
      changeType: function() {
        var fields = document.querySelectorAll(
          DOMStrings.inputType +
            "," +
            DOMStrings.inputDescription +
            "," +
            DOMStrings.inputValue
        );
  
        nodeListForEach(fields, function(cur) {
          cur.classList.toggle("red-focus");
        });
        document.querySelector(DOMStrings.inputButton).classList.toggle("red");
      },
  
      displayMonth: function() {
        var now, year, month;
  
        var now = new Date();
        //var christmas = new Date(2019, 11, 25);
        months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        month = now.getMonth();
        year = now.getFullYear();
        document.querySelector(DOMStrings.dateLabel).textContent =
          months[month] + " " + year;
      },
  
      getDOMStrings: function() {
        return DOMStrings;
      }
    };
  })();