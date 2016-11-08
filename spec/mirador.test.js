describe('Mirador | mirador.js', function() {
  var div;
  var mirador;
  function startMirador(done) {
    localStorage.clear();

    div = jQuery('<div/>');
    div.attr('id', 'viewer');
    div.appendTo('body');

    mirador = Mirador({
      id: 'viewer',
      layout: "1x2",
      buildPath: 'spec/',
      data: [{
        "manifestUri": "spec/data/manifest.json",
        "location": "Stanford University",
        "title": "MS 5",
        "widgets": []
      }]
    });

    mirador.viewer.eventEmitter.subscribe('manifestListItemRendered', function() {
      done();
    });
  }

  // Tests for object initialization
  describe('Initialization', function() {
    beforeAll(function(done) {
      startMirador(done);
    });
    afterAll(function() {
      jQuery(window).unbind('resize');
      d3.select(window).on('resize', null);
      div.remove();
      mirador = null;
    });

    it('should render manifest list items', function() {
      expect(mirador.viewer.manifestsPanel.manifestListItems.length).toBe(1);
    });

    it('should start Mirador as blank workspace', function() {
      expect(mirador.viewer).toBeDefined();
    });

    it('should select a manifest', function() {
      expect(div.find('.addItemLink').first()).toExist();
      div.find('.addItemLink').first().click();
      div.find('.select-metadata').first().click();
      expect(mirador.viewer.workspace.windows[0].manifest.uri).toEqual('spec/data/manifest.json');
    });

    it('should show logo specified in manifest', function(){
      expect(div.find(".repo-image>img")[0].getAttribute("src"))
        .toEqual("https://stacks-test.stanford.edu/image/iiif/ck546xs5106%2Folemiss1/full/300,/0/default.jpg");
    });

    it('should click first page in thumbnail view', function() {
      expect(div.find('.window').first()).toExist();
    });

    it('should click the next button', function() {
      expect(div.find('.window').first()).toExist();
    });
  });
});
