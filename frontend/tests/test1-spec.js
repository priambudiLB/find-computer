import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `http://find-computer.s3-website-ap-southeast-1.amazonaws.com/`;

test('My first test', async t => {
    await t
        // Use the assertion to check if the actual header text is equal to the expected one
        .expect(Selector('#title').innerText).eql('Find Computer');
});