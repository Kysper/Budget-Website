
//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  var setUpEventListeners = function() {
    var DOM = UICtrl.getDOMStrings();
    document
      .querySelector(DOM.inputButton)
      .addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);

    document
      .querySelector(DOM.inputType)
      .addEventListener("change", UICtrl.changeType);
  };

  var updateBudget = function() {
    var budget, DOM;
    //5.Calculate the budget
    budgetCtrl.calculateBudget();

    // Return the budget
    budget = budgetCtrl.getBudget();

    //6. Display the budget on UI
    UICtrl.displayBudget(budget);
  };

  var updatePercentages = function() {
    //1.Calculate percentages
    budgetCtrl.calculatePercentages();

    //2. Read percentages from the budget controller
    var percentages = budgetCtrl.getPercentages();

    //3. Update the UI with the new percentages
    UICtrl.displayPercentages(percentages);
  };

  var ctrlAddItem = function() {
    var input, newItem;

    //1. Get field input data
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      //3. Add the new item to UI
      UICtrl.addListItem(newItem, input.type);

      //4. Clear the fields
      UICtrl.clearFields();

      //5. Calculate and update budget
      updateBudget();

      //6. Calculate and update percentages
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function(event) {
    var itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.id;

    if (itemID) {
      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);

      //1.Delete item from data structure
      budgetCtrl.deleteItem(type, ID);
      //2.Delete item from the UI
      UICtrl.deleteListItem(itemID);

      //3.Update and show the new budget
      updateBudget();

      //4.Calculate and update percentages
      updatePercentages();
    }
  };

  return {
    init: function() {
      console.log("Application has started.");
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setUpEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
