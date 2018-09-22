package table66.docueos.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import table66.docueos.model.Passport;

import javax.ws.rs.BadRequestException;
import javax.ws.rs.NotFoundException;
import java.lang.reflect.Field;
import java.net.URI;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
public class MerkleService {
    private Map<String, Passport> passportStorage = Passport.loadAll();
    private Map<String, Passport> shareStorage = new ConcurrentHashMap<>();

    @RequestMapping(value = "/passport", method = RequestMethod.POST)
    public ResponseEntity<?> upload(
            @RequestParam("passport") MultipartFile passport,
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("nationality") String nationality,
            @RequestParam("passportNumber") String passportNumber,
            @RequestParam("birth") String birthDate,
            @RequestParam("issueDate") String issueDate,
            @RequestParam("expirationDate") String expirationDate,
            @RequestParam("issuer") String issuer
    ) {
        try {
            Passport p = new Passport();
            p.passport = passport.getBytes();
            p.photo = photo.getBytes();
            p.firstName = firstName;
            p.lastName = lastName;
            p.nationality = nationality;
            p.passportNumber = passportNumber;
            p.birthDate = birthDate;
            p.issueDate = issueDate;
            p.expirationDate = expirationDate;
            p.issuer = issuer;
            p.save();
            String hash = p.calculateHash();
            passportStorage.put(hash, p);
            // TODO: "/passport/" should not be hardcoded
            return ResponseEntity.created(new URI("/passport/" + hash)).build();
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @RequestMapping(value = "/passport/{hash}", method = RequestMethod.GET)
    public Passport download(@PathVariable("hash") String passportHash) {
        Passport passport = passportStorage.get(passportHash);
        if(passport == null) {
            // TODO: returns 500, should be 404
            throw new NotFoundException();
        }
        return passport;
    }

    @RequestMapping(value = "/passport/{hash}", method = RequestMethod.DELETE)
    public ResponseEntity<?> delete(@PathVariable("hash") String passportHash) {
        passportStorage.remove(passportHash);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/share/{hash}", method = RequestMethod.GET)
    public ResponseEntity<?> share(
            @PathVariable("hash") String passportHash,
            @RequestParam("fields") String[] fields
    ) {
        try {
            if (fields == null || fields.length == 0) {
                // TODO: returns 500, should be 400
                throw new BadRequestException("specify at least one field");
            }
            Passport passport = passportStorage.get(passportHash);
            if (passport == null) {
                // TODO: returns 500, should be 404
                throw new NotFoundException();
            }
            Passport share = new Passport();
            for (String field : fields) {
                try {
                    Field from = Passport.class.getField(field);
                    Field to = Passport.class.getField(field);
                    to.set(share, from.get(passport));
                }
                catch (Exception e) {
                    // TODO: returns 500, should be 400
                    throw new BadRequestException("no such field: " + field);
                }
            }
            String hash = share.calculateHash();
            shareStorage.put(hash, share);
            // TODO: "/verify/" should not be hardcoded
            return ResponseEntity.created(new URI("/verify/" + hash)).build();
        }
        catch(Exception e) {
            throw new RuntimeException(e);
        }
    }

    @RequestMapping(value = "/share/{hash}", method = RequestMethod.DELETE)
    public ResponseEntity<?> removeShare(@PathVariable("hash") String shareHash) {
        shareStorage.remove(shareHash);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/verify/{hash}", method = RequestMethod.GET)
    public Passport verify(@PathVariable("hash") String shareHash) {
        Passport share = shareStorage.get(shareHash);
        if(share == null) {
            // TODO: returns 500, should be 404
            throw new NotFoundException();
        }
        return share;
    }
}
