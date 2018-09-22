package table66.docueos.model;

import table66.docueos.util.JsonUtil;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public abstract class AbstractJson {
    @Override
    public String toString() {
        return toPrettyJson();
    }

    public String toJson() {
        return JsonUtil.toJson(this);
    }

    public String toPrettyJson() {
        return JsonUtil.toPrettyJson(this);
    }

    public void save(Path to) {
        save(to, true);
    }

    protected void save(Path to, boolean backupExisting) {
        try {
            Files.createDirectories(to.getParent());
            Path backupFile = to.resolveSibling(String.format("%s.%d", to.getFileName(), System.currentTimeMillis()));
            if(Files.exists(to)) {
                Files.copy(to, backupFile, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.COPY_ATTRIBUTES);
            }
            JsonUtil.writePrettyJson(to, this);
            if(!backupExisting && Files.exists(backupFile)) {
                Files.delete(backupFile);
            }
        }
        catch(IOException e) {
            throw new RuntimeException(e);
        }
    }
}
