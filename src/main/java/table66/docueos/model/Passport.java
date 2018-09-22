package table66.docueos.model;

import org.apache.commons.codec.binary.Hex;
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

    static {
        try {
            Files.createDirectories(Paths.get(System.getProperty("user.home")).resolve(".docueos"));
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String calculateHash() {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
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
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void save() {
        save(Paths.get(System.getProperty("user.home")).resolve(".docueos").resolve(calculateHash()));
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
