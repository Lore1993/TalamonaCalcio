package lorenzopellegrini.gestionebackoffice.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public String upload(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "folder", "talamonese-eventi",
                        "resource_type", "image"));
        return (String) uploadResult.get("secure_url");
    }

    public void delete(String imageUrl) {
        if (imageUrl == null || imageUrl.isBlank())
            return;
        try {
            // Estrai il public_id dall'URL di Cloudinary
            // URL format:
            // https://res.cloudinary.com/CLOUD/image/upload/v123/folder/publicid.ext
            String[] parts = imageUrl.split("/");
            String filenameWithExt = parts[parts.length - 1];
            String filename = filenameWithExt.substring(0, filenameWithExt.lastIndexOf('.'));
            String folder = parts[parts.length - 2];
            String publicId = folder + "/" + filename;

            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            // Log ma non bloccare il flusso se la cancellazione fallisce
            System.err.println("Errore cancellazione immagine Cloudinary: " + e.getMessage());
        }
    }
}
