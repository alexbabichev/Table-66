package table66.docueos.model;

import org.apache.commons.codec.binary.Hex;
import org.apache.commons.codec.digest.DigestUtils;
import table66.docueos.util.JsonUtil;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.security.MessageDigest;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@XmlRootElement
public class Passport extends AbstractJson {
    @XmlElement
    public byte[] passport;
    @XmlElement
    public byte[] photo;
    @XmlElement
    public String firstName;
    @XmlElement
    public String lastName;
    @XmlElement
    public String nationality;
    @XmlElement
    public String passportNumber;
    @XmlElement
    public String birthDate;
    @XmlElement
    public String issueDate;
    @XmlElement
    public String expirationDate;
    @XmlElement
    public String issuer;

    // TODO: Merkle Tree related logic to be rewritten to be generic

    // Merkle Tree - level 0 - bottom - leaves
    @XmlElement
    public byte[] passportHash;
    @XmlElement
    public byte[] photoHash;
    @XmlElement
    public byte[] firstNameHash;
    @XmlElement
    public byte[] lastNameHash;
    @XmlElement
    public byte[] nationalityHash;
    @XmlElement
    public byte[] passportNumberHash;
    @XmlElement
    public byte[] birthDateHash;
    @XmlElement
    public byte[] issueDateHash;
    @XmlElement
    public byte[] expirationDateHash;
    @XmlElement
    public byte[] issuerHash;

    // Merkle Tree - level 1
    @XmlElement
    public byte[] level1Hash1;
    @XmlElement
    public byte[] level1Hash2;
    @XmlElement
    public byte[] level1Hash3;
    @XmlElement
    public byte[] level1Hash4;
    @XmlElement
    public byte[] level1Hash5;

    // Merkle Tree - level 2
    @XmlElement
    public byte[] level2Hash1;
    @XmlElement
    public byte[] level2Hash2;

    // Merkle Tree - level 3
    @XmlElement
    public byte[] level3Hash1;

    // Merkle Tree - level 4 - root
    @XmlElement
    public byte[] rootHash;

    public String getRootHashHex() {
        return Hex.encodeHexString(rootHash);
    }

    static {
        try {
            Files.createDirectories(Paths.get(System.getProperty("user.home")).resolve(".docueos"));
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void buildMerkleProof(Passport model) {
        if(passport == null && photo != null) {
            passportHash = model.passportHash;
        }
        if(passport != null && photo == null) {
            photoHash = model.photoHash;
        }
        if(firstName == null && lastName != null) {
            firstNameHash = model.firstNameHash;
        }
        if(firstName != null && lastName == null) {
            lastNameHash = model.lastNameHash;
        }
        if(nationality == null && passportNumber != null) {
            nationalityHash = model.nationalityHash;
        }
        if(nationality != null && passportNumber == null) {
            passportNumberHash = model.passportNumberHash;
        }
        if(birthDate == null && issueDate != null) {
            birthDateHash = model.birthDateHash;
        }
        if(birthDate != null && issueDate == null) {
            issueDateHash = model.issueDateHash;
        }
        if(expirationDate == null && issuer != null) {
            expirationDateHash = model.expirationDateHash;
        }
        if(expirationDate != null && issuer == null) {
            issuerHash = model.issuerHash;
        }

        if(passportHash != null && photoHash != null || passportHash == null && photoHash == null) {
            level1Hash1 = model.level1Hash1;
            passportHash = null;
            photoHash = null;
        }
        if(firstNameHash != null && lastNameHash != null || firstNameHash == null && lastNameHash == null) {
            level1Hash2 = model.level1Hash2;
            firstNameHash = null;
            lastNameHash = null;
        }
        if(nationalityHash != null && passportNumberHash != null || nationalityHash == null && passportNumberHash == null) {
            level1Hash3 = model.level1Hash3;
            nationalityHash = null;
            passportNumberHash = null;
        }
        if(birthDateHash != null && issueDateHash != null || birthDateHash == null && issueDateHash == null) {
            level1Hash4 = model.level1Hash4;
            birthDateHash = null;
            issueDateHash = null;
        }
        if(expirationDateHash != null && issuerHash != null || expirationDateHash == null && issuerHash == null) {
            level1Hash5 = model.level1Hash5;
            expirationDateHash = null;
            issuerHash = null;
        }

        if(level1Hash1 != null && level1Hash2 != null || level1Hash1 == null && level1Hash2 == null) {
            level2Hash1 = model.level2Hash1;
            level1Hash1 = null;
            level1Hash2 = null;
        }
        if(level1Hash3 != null && level1Hash4 != null || level1Hash3 == null && level1Hash4 == null) {
            level2Hash2 = model.level2Hash2;
            level1Hash3 = null;
            level1Hash4 = null;
        }

        if(level2Hash1 != null && level1Hash2 != null || level2Hash1 == null && level1Hash2 == null) {
            level3Hash1 = model.level3Hash1;
            level2Hash1 = null;
            level2Hash2 = null;
        }
        if(level3Hash1 != null && level1Hash5 != null || level3Hash1 == null && level1Hash5 == null) {
            rootHash = model.rootHash;
            level3Hash1 = null;
            level1Hash5 = null;
        }
    }

    public void rebuildMerkleProof() {
/*
        byte[] passportHash = null, photoHash = null, firstNameHash = null, lastNameHash = null, nationalityHash = null,
            passportNumberHash = null, birthDateHash = null, issueDateHash = null, expirationDateHash = null, issuerHash = null,
            level1Hash1 = null, level1Hash2 = null, level1Hash3 = null, level1Hash4 = null, level1Hash5 = null,
            level2Hash1 = null, level2Hash2 = null, level3Hash1 = null, rootHash = null;

*/
        if(passport != null) {
            passportHash = DigestUtils.sha256(passport);
        }
        if(photo != null) {
            photoHash = DigestUtils.sha256(photo);
        }
        if(firstName != null) {
            firstNameHash = DigestUtils.sha256(firstName);
        }
        if(lastName != null) {
            lastNameHash = DigestUtils.sha256(lastName);
        }
        if(nationality != null) {
            nationalityHash = DigestUtils.sha256(nationality);
        }
        if(passportNumber != null) {
            passportNumberHash = DigestUtils.sha256(passportNumber);
        }
        if(birthDate != null) {
            birthDateHash = DigestUtils.sha256(birthDate);
        }
        if(issueDate != null) {
            issueDateHash = DigestUtils.sha256(issueDate);
        }
        if(expirationDate != null) {
            expirationDateHash = DigestUtils.sha256(expirationDate);
        }
        if(issuer != null) {
            issuerHash = DigestUtils.sha256(issuer);
        }

        MessageDigest digest = DigestUtils.getSha256Digest();
        if(passportHash != null && photoHash != null) {
            digest.update(passportHash);
            digest.update(photoHash);
            level1Hash1 = digest.digest();
        }
        if(firstNameHash != null && lastNameHash != null) {
            digest.update(firstNameHash);
            digest.update(lastNameHash);
            level1Hash2 = digest.digest();
        }
        if(nationalityHash != null && passportNumberHash != null) {
            digest.update(nationalityHash);
            digest.update(passportNumberHash);
            level1Hash3 = digest.digest();
        }
        if(birthDateHash != null && issueDateHash != null) {
            digest.update(birthDateHash);
            digest.update(issueDateHash);
            level1Hash4 = digest.digest();
        }
        if(expirationDateHash != null && issuerHash != null) {
            digest.update(expirationDateHash);
            digest.update(issuerHash);
            level1Hash5 = digest.digest();
        }

        if(level1Hash1 != null && level1Hash2 != null) {
            digest.update(level1Hash1);
            digest.update(level1Hash2);
            level2Hash1 = digest.digest();
        }
        if(level1Hash3 != null && level1Hash4 != null) {
            digest.update(level1Hash3);
            digest.update(level1Hash4);
            level2Hash2 = digest.digest();
        }

        if(level2Hash1 != null && level2Hash2 != null) {
            digest.update(level2Hash1);
            digest.update(level2Hash2);
            level3Hash1 = digest.digest();
        }
        if(level3Hash1 != null && level1Hash5 != null) {
            digest.update(level3Hash1);
            digest.update(level1Hash5);
            rootHash = digest.digest();
        }
    }

    public void buildMerkleTree() {
        passportHash = DigestUtils.sha256(passport);
        photoHash = DigestUtils.sha256(photo);
        firstNameHash = DigestUtils.sha256(firstName);
        lastNameHash = DigestUtils.sha256(lastName);
        nationalityHash = DigestUtils.sha256(nationality);
        passportNumberHash = DigestUtils.sha256(passportNumber);
        birthDateHash = DigestUtils.sha256(birthDate);
        issueDateHash = DigestUtils.sha256(issueDate);
        expirationDateHash = DigestUtils.sha256(expirationDate);
        issuerHash = DigestUtils.sha256(issuer);

        MessageDigest digest = DigestUtils.getSha256Digest();
        digest.update(passportHash);
        digest.update(photoHash);
        level1Hash1 = digest.digest();
        digest.update(firstNameHash);
        digest.update(lastNameHash);
        level1Hash2 = digest.digest();
        digest.update(nationalityHash);
        digest.update(passportNumberHash);
        level1Hash3 = digest.digest();
        digest.update(birthDateHash);
        digest.update(issueDateHash);
        level1Hash4 = digest.digest();
        digest.update(expirationDateHash);
        digest.update(issuerHash);
        level1Hash5 = digest.digest();

        digest.update(level1Hash1);
        digest.update(level1Hash2);
        level2Hash1 = digest.digest();
        digest.update(level1Hash3);
        digest.update(level1Hash4);
        level2Hash2 = digest.digest();

        digest.update(level2Hash1);
        digest.update(level2Hash2);
        level3Hash1 = digest.digest();

        digest.update(level3Hash1);
        digest.update(level1Hash5);
        rootHash = digest.digest();
    }

    public String calculateHash() {
        MessageDigest digest = DigestUtils.getSha256Digest();
        if(passport != null) {
            digest.update(passport);
        }
        if(photo != null) {
            digest.update(photo);
        }
        if(firstName != null) {
            digest.update(firstName.getBytes());
        }
        if(lastName != null) {
            digest.update(lastName.getBytes());
        }
        if(nationality != null) {
            digest.update(nationality.getBytes());
        }
        if(passportNumber != null) {
            digest.update(passportNumber.getBytes());
        }
        if(birthDate != null) {
            digest.update(birthDate.getBytes());
        }
        if(issueDate != null) {
            digest.update(issueDate.getBytes());
        }
        if(expirationDate != null) {
            digest.update(expirationDate.getBytes());
        }
        if(issuer != null) {
            digest.update(issuer.getBytes());
        }
        return Hex.encodeHexString(digest.digest());
    }

    public void save() {
        save(Paths.get(System.getProperty("user.home")).resolve(".docueos").resolve(getRootHashHex()));
    }

    public static Map<String, Passport> loadAll() {
        try {
            Map<String, Passport> result = new ConcurrentHashMap<>();
            Files.walkFileTree(Paths.get(System.getProperty("user.home")).resolve(".docueos"), new SimpleFileVisitor<Path>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                    String jsonData = new String(Files.readAllBytes(file));
                    Passport p = JsonUtil.parseJson(jsonData, Passport.class);
                    result.put(file.getFileName().toString(), p);
                    return FileVisitResult.CONTINUE;
                }
            });
            return result;
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
