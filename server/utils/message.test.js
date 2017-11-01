const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => { // no need for done()
      var from = 'Vivi';
      var text = 'gup';
      var message = generateMessage(from, text);

      expect(typeof message.createdAt).toBe('number');
      // expect(message).toInclude({from, text}); // toInclude no longer works with newer version of expect
      // // alternative ways bellow:
      // // expect(message).toInclude({
      // //   from: from,
      // //   text: text
      // // });
      expect(message.from).toBe(from);
      expect(message.text).toBe(text);


    });
});
