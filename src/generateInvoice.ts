import Invoice from 'lightnode-invoice';

// TODO: Generate invoice from a real node?
const privKey = Buffer.from(
  'e126f68f7eafcc8b74f54d269fe206be715000f94dac067d1c04a8ca3b2db734',
  'hex'
);
 
export default function generateInvoice(amount: string, desc: string) {
  const input = new Invoice();
  input.timestamp = 1496314658;
  input.amount = amount;
  input.paymentHash = '0001020304050607080900010203040506070809000102030405060708090102';
  input.shortDesc = desc;
  input.expiry = 60;
  return Invoice.encode(input, privKey);
}
