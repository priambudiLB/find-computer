package bagas.FindComputer.model;

//import javax.persistence.*;
//import javax.validation.constraints.NotNull;
//import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

//@Entity
//@Table(name = "user")
public class User implements Serializable {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

//    @NotNull
//    @Size(max = 100)
//    @Column(name = "name", nullable = false)
    private String name;

//    @NotNull
//    @Size(max = 20)
//    @Column(name = "username", nullable = false)
    private String username;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getUsername() {
        return username;
    }
}