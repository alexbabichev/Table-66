# προοφεοσ – Table66 @eoshackathon
__Secure Data Proof with Privacy You Control__

## Preamble
How many times a year do you show your ID? Each time you need to reveal all the information it contains, even if your intent is showing only a portion of it. This is neither confidential nor convenient. Having an ID always with you may also entail additional risks of being stolen or lost.

Our solution is an EOSIO-based user-friendly app named “Proofeos” that allows to prove the data of your choice to a certain party.  

Let’s take a look at the demo: you want to buy beer in a store, and a cashier has to verify that you’re over 21. Normally, you’d show your ID with the full info. But why should you disclose all the information? And what if your ID was left at home? Here’s what we propose. A person uses an app to upload the ID and verify it by some trusted authority (like a bank). Each time the third party requests this ID for certain purposes, a person chooses, which info to disclose, and generates the QR code. The cashier in the store only needs to scan this code and obtain the verified info that this person is over 21. 

Think of it as an ApplePay for ID proof. No need to carry your ID with you and disclose all the data when only your age is required.

What are the growth opportunities? Now, there are 6.6 Billion people with IDs on Earth. And these are only IDs. What about proof of your university degree to apply for a job? A driver’s licence to rent a car? And each time we have either to have all these docs with us and disclose them in full, or transfer them insecurely. 

Proofeos solves this problem using EOS blockchain and providing a secure data proof with privacy you control. Keeping transactions costs as low as possible is essential for this application, that’s why EOS looks to be a good fit for it.

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
