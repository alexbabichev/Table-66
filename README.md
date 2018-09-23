# προοφεοσ – Table66 @eoshackathon
__Secure Data Proof with Privacy You Control__

## The Pitch

How often do you show your ID? People show it every day, in different cases, to others they’re not acquainted with. Each time you show your ID, you disclose _all the data_ on it. This is neither secure nor private. You can forget it at home or even lose. But what if you have your ID in your cell phone? How to prove to others it's valid?

Our team has created "Proofeos" - an EOS-based user-friendly mobile app that allows uploading and validating your document, and then _choosing_ what data you want you disclose to the third party and prove it's valid. 

Imagine a young-looking person wishing to buy a beer in a store, and a cashier has to verify that the person is over 21. The person launches "Proofeos" app. 


#### Demo: 
* __Screen 1__: Here is the main screen of the app. It shows a list of already verified documents.   
  A user can add a new document
* __Screen 2__: By taking photo of that document  
  And filling in the provided fields.
* __Screen 3__: Thereby, the root hash of the document is sent to the Blockchain 
* __Screen 4__: However, this document can’t be used until it gets verified by a recognizable authority (like a bank).
* __Screen 5__: When the document gets verified (see the checkmark appeared),a user can generate a proof. Let’s use the driving licence.
* __Screen 6__: A user selects the data to share. A birth date and a photo are definitely enough for a cashier to verify his age. Exposing a name is definitely not required. So he presses ‘Done’ and the QR code proof is generated.
* __Screen 7__: The verifier has to scan the QR-code proof with their cell phone and validate it.
* __Screen 8__: The cashier sees the age proof as a photo along with a birth date on their cell phone. They can easily match it to the buyer.   
  The cashier can be sure this was not faked ‘cause Proof was validated via Blockchain smart contract. And the buyer doesn't need to disclose extra info or even have the actual ID with him. 

Think of it as an ApplePay for ID proof. No need to carry your ID with you and disclose all the personal data when only your age is needed.

Currently, there are __6.6 Billion__ people on Earth with IDs. And these are just IDs. What about proof of your university degree when you apply for a job? A driver’s licence to rent a car? 

Sharing private identification data already became a problem. W3C has established a "Verifiable Claims work group" and is actively working on standardizing the industry. GDPR regulation is live and represents a __$3.5 billion__ security products. "Proofeos" will solve this problem by providing a decentralized, secure and privacy preserving way of sharing Credentials, in both human and smart contract readable form. 

## Use Case Flow 

### Pre condition:
1. Government (Issuer) issues user (Holder) an ID card.

### Setup Flow: 
1. User imports a scan into “Upload document page”
1. User selects part of ID document with photo.
    1. ID picture cropped to have photo only => PicturePhotoOnID.jpg
    1. ID document full scan => PictureID.jpg
1. User fills in text form with data from ID card
    1. First Name: XXX
    1. Last Name: XXX
    1. ID Number: XXX
    1. Birth Date: XXX
    1. Citizenship: XXX
    1. Date Issued: XXX
    1. Expiration Date: XXX
    1. Issuer: XXX
1. FrontEnd generates hash(a.)...hash(g.), hash(PicturePhotoOnID.jpg), forms Merkle Tree and upload send IDMerkleRoot -> SmartContract. Smart contract saves this IDMerkleRoot into internal Table. Transaction ID returned to FrontEnd.
1. FrontEnd sends "validation" request to bank and includes into "validation" request the following data:
    1. PictureID.jpg
    1. PicturePhotoOnID.jpg
    1. ID Text Data
        1. a..g items from above
1. Bank approves user's data in Smart Contract by adding "approved" check mark
    1. Possible implementation: either 2 separate tables with "pending" and "approved" document hashes.


### Manual Validate flow: 
1. User comes to a Shop and wants to buy alcohol (age >= 21 required)
1. User is asked to provide Proof that his age >= 21. 
1. User selects data to reveal to the Shop. (i.e. reveal PicturePhotoOnID.jpg and BirthDate)
1. Client sends to Server PicturePhotoOnID.jpg, MerklePath(PicturePhotoOnID.jpg), BirthDate, MerklePath (BirthDate). Server returns dataLink back to client.
1. dataLink is exposed on User’s cell phone as QR Code 
1. By scanning QR Code, cashier (verifier’s device):
    1. Retrieves PicturePhotoOnID.jpg, MerklePath(PicturePhotoOnID.jpg), BirthDate, MerklePath(BirthDate)
    1. Retrieve MerkleRoot out of SmartContract (if not found -> FAIL)
    1. Calculate hash(PicturePhotoOnID.jpg) and hash(BirthDate)
    1. Validate MerklePath(PicturePhotoOnID.jpg) and MerklePath(BirthDate)
    1. Show to cashier picturePhotoOnID.jpg and BirthDate if all validations passed. 


### Extension: Smart Contract Validation flow:
Idea: as User, I want to claim coin from Smart Contract when I send transaction to Smart Contract with VerifiableProof (BirthDate)

#### PreCondition: 
1. Escrow Smart Contract deployed and has balance.
1. ID Card MerkleRoot is registered in Registry Smart Contract and approved by Bank.

#### Flow: 
1. User calculates VerifiableProof (BirthDate) 
1. User sends VerifiableProof (BirthDate), MerklePath (BirthDate) to EscrowSmartContract
1. EscrowSmartContract:
    1. Check MerklePath (BirthDate) with Registry Smart contract (if does not exists -> FAIL)
    1. Check VerifiableProof (BirthDate) (if validation failed -> FAIL)
    1. If both checks passed -> Send coin back to user.
