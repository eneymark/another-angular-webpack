describe('testing angular webpack app', function(){

    beforeEach(module('angularWebpack'));
    /**
     * just a simple test to know that no compatibility issues are there
     */
    it('should test that service should have a test method', inject(function(testService){
        expect(testService.test).toBeDefined();
    }));
});