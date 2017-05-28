$(function(){

  var model = {
    data: {
      counters: null,
      counterIndex: null,
      counterChangedAt: null,
      pages: null,
      pageIndex: null,
      pageChangedAt: null,
    },
    init: function(datum, babel){
      model.data.counters = datum.counters.map(babel.convertString);
      model.data.countersOriginal = datum.counters;
      model.data.counterIndex = 0;
      model.data.counterChangedAt = Date.now();
      model.data.pages = datum.pagesAndNumbers.map(function(currentPageAndNumber, index, pages){
        return babel.convert(currentPageAndNumber[0], currentPageAndNumber[1])
      });
      model.data.pageIndex = 0;
      model.data.pageChangedAt = Date.now();
    },
    nextCounter: function(){
      model.data.counterIndex++;
      model.data.counterChangedAt = Date.now();
    },
    nextPage: function(){
      model.data.pageIndex++;
      model.data.pageChangedAt = Date.now();
      model.data.counterIndex = 0;
      model.data.counterChangedAt = Date.now();
    },
  };

  var controller = {
    counter: function(){
      return model.data.counters[model.data.counterIndex]
    },
    counterOriginal: function(){
      return model.data.countersOriginal[model.data.counterIndex]
    },
    page: function(){
      return model.data.pages[model.data.pageIndex]
    },
    spans: function(){
      return $(controller.page().replace(/<br>/g,''))
    },
    initialPage: function(){
      return model.data.pages[0]
    },
    init: function(datum, babel, actions){

      $("#page").html(Babel().convert("", ""));

      $(document).on("keypress", function(){
        if (!controller.initialized) {
          controller.initialized = true;
          model.init(datum, babel);
          view.init(actions);
          controller.start = setInterval(controller.update, 1000);
        }
      })
    },
    initialized: false,
    start: null,
    update: function() {
      var dateNow = Date.now();
      if (model.data.counterChangedAt + 900 < dateNow) {
        model.nextCounter();
        view.renderCounter();
      }
      if (model.data.pageChangedAt + 14900 < dateNow ) {
        model.nextPage();
        view.renderPage();
      }

    }
  };

  var view = {
    init: function(actions){
      this.page = $("#page");
      view.actions = actions;

      this.page.html( controller.initialPage() );

      view.render();
    },
    actions: null,
    renderPage: function(){
      // RENDER
      var action = function(currentSpans,renderedSpans,index){
        console.log("start action");
        var filteredCurrentSpans = currentSpans.filter(function () {
          return $(this).data("d") == index;
        });
        var filteredRenderedSpans = renderedSpans.filter(function () {
          return $(this).data("d") == index;
        });

        filteredCurrentSpans.each(function(index, currentSpan){
          $(filteredRenderedSpans[index]).replaceWith($(currentSpan));
        });
      }
      var currentSpans = controller.spans();
      var renderedSpans = this.page.find('span');

      // COLOR
      var lastAction = function(a, spans, index){
        spans.filter(function () {
          return $(this).data("d") == index;
        }).addClass("a");
      };

      var startLastAction = function(){
        console.log("start last action");
        view.actions.start(lastAction, [], $("#page").find('span'), 50, function(){});
      }
      
      view.actions.start(action, currentSpans, renderedSpans, 47, startLastAction);



    },
    renderCounter: function(){
      var counter = $(controller.counter());
      var counterOriginal = controller.counterOriginal();
      var oldCounter = this.page.find('span').slice(-counterOriginal.length);

      // RENDER AND COLOR
      view.actions.start(function(counter, oldCounter, index){
        $(oldCounter[index]).replaceWith($(counter[index]).addClass("a"));
        // $(counter[index]).addClass("active");
      }, counter, oldCounter, counter.length, function(){});

    },
    render: function(){
      view.renderPage();
      view.renderCounter();
    }
  };

  var datum   = Datum();
  var babel   = Babel();
  var actions = Actions();

  controller.init(datum, babel, actions);

});



