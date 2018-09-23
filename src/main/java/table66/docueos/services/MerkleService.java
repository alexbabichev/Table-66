package table66.docueos.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import table66.docueos.model.Passport;

import javax.ws.rs.BadRequestException;
import javax.ws.rs.InternalServerErrorException;
import javax.ws.rs.NotFoundException;
import java.lang.reflect.Field;
import java.net.URI;
import java.util.Arrays;
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
            p.buildMerkleTree();
            p.save();
            String hash = p.getRootHashHex();
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
            throw new NotFoundException();
        }
        return passport;
    }

    @RequestMapping(value = "/passport/{hash}", method = RequestMethod.DELETE)
    public ResponseEntity<?> delete(@PathVariable("hash") String passportHash) {
        if(passportStorage.remove(passportHash) == null) {
            throw new NotFoundException();
        }
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/verification/{hash}", method = RequestMethod.POST)
    public ResponseEntity<?> share(
            @PathVariable("hash") String passportHash,
            @RequestParam("fields") String[] fields
    ) {
        try {
            if (fields == null || fields.length == 0) {
                throw new BadRequestException("specify at least one field");
            }
            Passport passport = passportStorage.get(passportHash);
            if (passport == null) {
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
                    throw new BadRequestException("no such field: " + field);
                }
            }
            share.buildMerkleProof(passport);
            String hash = share.calculateHash();
            shareStorage.put(hash, share);
            // TODO: "/verification/" should not be hardcoded
            return ResponseEntity.created(new URI("/verification/" + hash)).build();
        }
        catch(Exception e) {
            throw new RuntimeException(e);
        }
    }

    @RequestMapping(value = "/verification/{hash}", method = RequestMethod.DELETE)
    public ResponseEntity<?> removeShare(@PathVariable("hash") String shareHash) {
        if(shareStorage.remove(shareHash) == null) {
            throw new NotFoundException();
        }
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/verification/{hash}", method = RequestMethod.GET)
    public Passport verify(@PathVariable("hash") String shareHash) {
        Passport share = shareStorage.get(shareHash);
        if(share == null) {
            throw new NotFoundException();
        }
        share.rebuildMerkleProof();
        if(share.rootHash == null) {
          throw new InternalServerErrorException("resource specified is corrupted");
        }
        Passport passport = passportStorage.get(share.getRootHashHex());
        if(passport == null) {
            throw new NotFoundException("cannot verify the resource");
        }
        if(!Arrays.equals(share.rootHash, passport.rootHash)) {
          throw new NotFoundException("not a valid resource");
        }
        return share;
    }
}
