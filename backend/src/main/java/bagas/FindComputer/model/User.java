package bagas.FindComputer.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

    public void setName(String name) {
        this.name = name;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}